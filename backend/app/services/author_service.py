import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Author
from math import ceil
from app.models import Book


class AuthorService:

    @staticmethod
    def get_author(authorid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM authors WHERE authorid = %s",
                (authorid,),
            )

            author_data = cursor.fetchone()
            if author_data:
                author = Author(**author_data)
                return author
            return None
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_author(author: Author):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """
        INSERT INTO authors (authorid, name, wiki_link, image, bio)
        VALUES (%s,%s,%s,%s,%s);
        """

        try:
            cursor.execute(
                prompt,
                (
                    author.authorid,
                    author.name,
                    author.wiki_link,
                    author.image,
                    author.description,
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
    def update_author(author: Author):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        prompt = """UPDATE authors SET name = %s, wiki_link = %s, image = %s, description= %s, summary=%s
                WHERE authorid =%s;
                """
        try:
            cursor.execute(
                prompt,
                (
                    author.name,
                    author.wiki_link,
                    author.image,
                    author.description,
                    author.summary,
                    author.authorid,
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
    def delete_author(authorid: int):
        conn = get_db_connection()
        cursor = conn.cursor()
        prompt = """DELETE FROM authors WHERE authorid = %s;"""
        try:
            cursor.execute(prompt, (authorid,))
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_authorCard(authorid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT authorid, name, image FROM authors WHERE authorid = %s",
                (authorid,),
            )

            author_data = cursor.fetchone()
            if author_data:
                return author_data
            return None
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_authors(page_number, per_page, input_word):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """SELECT count(*) FROM authors WHERE LOWER(name) LIKE %s"""
                try:
                    cur.execute(
                        query,
                        (("%" + input_word + "%"),),
                    )
                    result = cur.fetchone()
                    total_count = result["count"] if result else 0

                    page_count = ceil((total_count) / per_page)

                    if page_number > page_count:
                        return [], page_count

                    cur.execute(
                        """SELECT authorid FROM authors 
                        WHERE LOWER(name) LIKE %s
                        LIMIT %s OFFSET %s;
                        """,
                        (("%" + input_word + "%"), per_page, offset),
                    )

                    authorIds = cur.fetchall()
                    if authorIds:
                        return authorIds, page_count
                    return None
                except Exception as e:
                    print(str(e))
                    raise e
                finally:
                    cur.close()
                    conn.close()

    @staticmethod
    def get_all_books_of_author(authorid, page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                """
                SELECT COUNT(*) AS total_count
                FROM authors a
                INNER JOIN bookauthors ba ON a.authorid = ba.authorid
                WHERE ba.authorid = %s;
                """,   
                (authorid,),
            )
            result = cursor.fetchone()
            total_count = result["total_count"] if result else 0

            page_count = ceil((total_count) / per_page)

            if page_number > page_count:
                return [], page_count, page_count

            cursor.execute(  # is it better to show highest rated books?
                """
                SELECT b.bookid, b.title, b.cover, b.description, b.format, b.page_numbers, b.pub_date, b.goodreads_rating   
                FROM books b INNER JOIN bookauthors ba 
                ON b.bookid = ba.bookid
                WHERE ba.authorid = %s
                --ORDER BY b.goodreads_rating DESC      
                LIMIT %s OFFSET %s;
                """,
                (authorid,per_page, offset,),
            )
            books_data = cursor.fetchall()
            print(books_data)
            if books_data:
                books = [Book(**book) for book in books_data]
                return books
            return []
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()
