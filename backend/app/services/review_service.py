import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Review


class ReviewService:

    @staticmethod
    def get_all_reviews_of_book(bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM reviews WHERE bookid =%s;",
                (bookid,),
            )
            reviews_data = cursor.fetchall()
            if reviews_data:
                reviews = [Review(**review) for review in reviews_data]
                return reviews
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_reviews_of_user(userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM reviews WHERE userid =%s;",
                (userid,),
            )
            reviews_data = cursor.fetchall()
            if reviews_data:
                reviews = [Review(**review) for review in reviews_data]
                return reviews
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_review(userid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM reviews WHERE userid =%s And bookid =%s;",
                (
                    userid,
                    bookid,
                ),
            )
            review_data = cursor.fetchone()
            if review_data:
                review = Review(**review_data)
                return review
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
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def update_review(review: Review):
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
                    review.review,
                    review.rating,
                    review.userid,
                    review.bookid,
                ),
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

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
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
