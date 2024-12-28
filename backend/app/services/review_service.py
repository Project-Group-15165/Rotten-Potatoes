import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Review
from math import ceil


class ReviewService:

    @staticmethod
    def get_all_reviews(page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT COUNT(*) FROM reviews ;",
            )
            result = cursor.fetchone()
            total_count = result["count"] if result else 0

            page_count = ceil((total_count) / per_page)

            if page_number > page_count:
                return [], page_count, page_count

            cursor.execute(
                """SELECT reviewid FROM reviews 
                LIMIT %s OFFSET %s;
                """,
                (
                    per_page,
                    offset,
                ),
            )
            reviews_data = cursor.fetchall()
            print(reviews_data)
            if reviews_data:
                return reviews_data, page_count, page_count
            return [], page_count, page_count
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_reviews_of_book(bookid, page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT COUNT(*) FROM reviews WHERE bookid =%s;",
                (bookid,),
            )
            result = cursor.fetchone()
            total_count = result["count"] if result else 0

            page_count = ceil((total_count) / per_page)

            if page_number > page_count:
                return [], page_count, page_count

            cursor.execute(
                """SELECT * FROM reviews 
                WHERE bookid =%s
                LIMIT %s OFFSET %s;
                """,
                (bookid, per_page, offset),
            )
            reviews_data = cursor.fetchall()
            if reviews_data:
                reviews = [Review(**review) for review in reviews_data]
                return reviews, page_count, page_count
            return [], page_count, page_count
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_reviews_of_user(userid, page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT COUNT(*) FROM reviews WHERE userid =%s;",
                (userid,),
            )
            result = cursor.fetchone()
            total_count = result["count"] if result else 0

            page_count = ceil((total_count) / per_page)

            if page_number > page_count:
                return [], page_count, page_count

            cursor.execute(
                """SELECT reviewid FROM reviews 
                WHERE userid =%s
                LIMIT %s OFFSET %s;
                """,
                (userid, per_page, offset),
            )
            reviews_data = cursor.fetchall()
            if reviews_data:
                return reviews_data, page_count, page_count
            return [], page_count, page_count
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_review(reviewid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """SELECT T1.*,T2.username,T2.avatar,T3.title 
        FROM reviews as T1 
        JOIN users as T2 ON T1.userid = T2.userid
        JOIN books as T3 ON T1.bookid = T3.bookid
        WHERE T1.reviewid=%s;
        """
        try:
            cursor.execute(
                prompt,
                (reviewid,),
            )
            review_data = cursor.fetchone()
            if review_data:
                return review_data
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_user_review(bookid, userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """SELECT T1.*,T2.username,T2.avatar,T3.title 
        FROM reviews as T1 
        JOIN users as T2 ON T1.userid = T2.userid
        JOIN books as T3 ON T1.bookid = T3.bookid
        WHERE T1.bookid=%s AND T2.userid=%s;
        """
        try:
            cursor.execute(
                prompt,
                (
                    bookid,
                    userid,
                ),
            )
            review_data = cursor.fetchone()
            if review_data:
                return review_data
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_review(review: Review):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """INSERT INTO reviews (userid, bookid, review, rating)
        VALUES (%s,%s,%s,%s);
        """
        try:
            cursor.execute(
                prompt,
                (
                    review.userid,
                    review.bookid,
                    review.review,
                    review.rating,
                ),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
        ReviewService.update_potatometer(
            bookid=review.bookid,
        )
        ReviewService.increment_count(
            bookid=review.bookid,
        )

    @staticmethod
    def update_review(review, userid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """UPDATE reviews 
        SET review=%s, rating=%s
        WHERE userid =%s AND bookid =%s;
        """
        try:
            cursor.execute(
                prompt,
                (
                    review["review"],
                    review["rating"],
                    userid,
                    bookid,
                ),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
        ReviewService.update_potatometer(
            bookid=bookid,
        )

    @staticmethod
    def delete_review(
        userid,
        bookid,
    ):
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "DELETE FROM reviews WHERE userid =%s And bookid =%s;",
                (
                    userid,
                    bookid,
                ),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
        ReviewService.update_potatometer(
            bookid=bookid,
        )
        ReviewService.decrease_count(
            bookid=bookid,
        )

    @staticmethod
    def update_potatometer(bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT AVG(rating) AS average FROM reviews WHERE bookid=%s;",
                (bookid,),
            )
            average = cursor.fetchone()["average"]
            if average:
                average = round(average, 2)
            else:
                average = 0

            cursor.execute(
                "UPDATE books SET potato_meter=%s WHERE bookID=%s;",
                (
                    average,
                    bookid,
                ),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise

    @staticmethod
    def increment_count(bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "UPDATE books SET reviews_number = reviews_number + 1 WHERE bookID=%s;",
                (bookid,),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise

    @staticmethod
    def decrease_count(bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "UPDATE books SET reviews_number = reviews_number - 1 WHERE bookID=%s;",
                (bookid,),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise
