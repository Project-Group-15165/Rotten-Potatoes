import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Genre
from math import ceil
from app.models import Book


class GenreService:

    @staticmethod
    def get_genre_by_id(genreid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM genres WHERE genreid = %s;",
                (genreid,),
            )
            genre_data = cursor.fetchone()
            if genre_data:
                genre = Genre(**genre_data)
                return genre
            return None
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_genre(genre: Genre):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """INSERT INTO genres (name) VALUES (%s);"""
        try:
            cursor.execute(
                prompt,
                (
                    genre.name,
                ),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def update_genre(genre: Genre):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """UPDATE genres SET name=%s WHERE genreid = %s;"""
        try:
            cursor.execute(
                prompt,
                (
                    genre.name,
                    genre.genreid,
                ),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def delete_genre(genreid):
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "DELETE FROM genres WHERE genreid = %s;",
                (genreid,),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_genres(page_number, per_page):                         
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """SELECT count(*) FROM genres """   
                try:      
                    cur.execute(query)
                    result = cur.fetchone()
                    total_count = result["count"] if result else 0

                    page_count = ceil((total_count) / per_page)

                    if page_number > page_count:
                        return [], page_count, page_count
                    
                    cur.execute(
                        """SELECT genreid FROM genres 
                        LIMIT %s OFFSET %s;
                        """,
                        (per_page, offset),
                    )
                       
                    genreIds = cur.fetchall()
                    if genreIds:
                        return genreIds
                    return None
                except Exception as e:
                    raise e 
                finally:
                    cur.close()
                    conn.close()

      
    @staticmethod
    def get_all_books_of_genre(genreid, page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                """
                SELECT COUNT(*) AS total_count
                FROM books b
                INNER JOIN bookgenres bg ON b.bookid = bg.bookid
                WHERE bg.genreid = %s;
                """,   
                (genreid,),
            )
            result = cursor.fetchone()
            total_count = result["total_count"] if result else 0

            page_count = ceil((total_count) / per_page)

            if page_number > page_count:
                return [], page_count, page_count

            cursor.execute(
                """
                SELECT b.bookid, b.title, b.cover, b.description, b.format, b.page_numbers, b.pub_date, b.goodreads_rating   
                FROM books b INNER JOIN bookgenres bg 
                ON b.bookid = bg.bookid
                WHERE bg.genreid = %s
                LIMIT %s OFFSET %s;
                """,
                (genreid, per_page, offset),
            )
            books_data = cursor.fetchall()
            print(books_data)
            if books_data:
                books = [Book(**book) for book in books_data]
                return books, page_count, page_count
            return [], page_count, page_count
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()


   