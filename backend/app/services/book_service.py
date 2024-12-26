import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Book
from math import ceil

class BookService:
    @staticmethod
    def add_book(book: Book):  # we need to add genres tooo!!!!
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """INSERT INTO books( title, cover, description, format, page_numbers, pub_date, goodreads_rating)
                           VALUES ( %s, %s, %s, %s, %s, %s, %s )"""

                try:
                    cur.execute(
                        query,
                        (
                            book.title,
                            book.cover,
                            book.description,
                            book.format,
                            book.page_numbers,
                            book.pub_date,
                            book.goodreads_rating,
                        ),
                    )
                    conn.commit()

                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()

    @staticmethod
    def delete_book(bookid: int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    DELETE FROM books WHERE bookID = %s
                """
                try:
                    cur.execute(query, (bookid,))
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()

    @staticmethod
    def update_book(book: Book):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """UPDATE books SET 
                    title=%s, cover=%s, description=%s, format=%s, page_numbers=%s, pub_date=%s, goodreads_rating=%s
                    WHERE bookID=%s
                """
                try:
                    cur.execute(
                        query,
                        (
                            book.title,
                            book.cover,
                            book.description,
                            book.format,
                            book.page_numbers,
                            book.pub_date,
                            book.goodreads_rating,
                            book.bookid,
                        ),
                    )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()

    @staticmethod
    def get_book_by_id(bookid: int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    WITH OrderedAuthors AS (
                        SELECT 
                            T4.bookID, 
                            ARRAY_AGG(T5.authorid ORDER BY T5.authorid ASC) AS authorids,
                            ARRAY_AGG(T5.name ORDER BY T5.authorid ASC) AS authors
                        FROM bookauthors AS T4
                        JOIN authors AS T5 ON T4.authorid = T5.authorid
                        GROUP BY T4.bookID
                    ),
                    OrderedGenres AS (
                        SELECT 
                            T2.bookID, 
                            ARRAY_AGG(T3.genreid ORDER BY T3.genreid ASC) AS genreids,
                            ARRAY_AGG(T3.name ORDER BY T3.genreid ASC) AS genres
                        FROM bookgenres AS T2
                        JOIN genres AS T3 ON T2.genreid = T3.genreid
                        GROUP BY T2.bookID
                    )
                    SELECT 
                        T1.title, 
                        T1.cover, 
                        T1.description, 
                        T1.format, 
                        T1.goodreads_rating, 
                        T1.potato_meter,
                        T1.reviews_number,
                        G.genres, 
                        G.genreids,
                        A.authors, 
                        A.authorids,
                        T1.page_numbers, 
                        T1.pub_date
                    FROM books AS T1
                    JOIN OrderedAuthors AS A ON T1.bookID = A.bookID
                    JOIN OrderedGenres AS G ON T1.bookID = G.bookID
                    WHERE T1.bookID = %s;

                """

                try:
                    cur.execute(query, (bookid,))
                    book_data = cur.fetchone()  # only one book
                    if book_data:
                        return book_data
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()

    @staticmethod
    def get_all_books(page_number, per_page, input_word):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """SELECT count(*) FROM books WHERE LOWER(title) LIKE %s"""
                try:
                    cur.execute(
                        query,
                        ("%" + input_word + "%",),
                    )
                    result = cur.fetchone()
                    total_count = result["count"] if result else 0

                    page_count = ceil((total_count) / per_page)

                    if page_number > page_count:
                        return [], page_count

                    cur.execute(
                        """SELECT bookid FROM books 
                        WHERE LOWER(title) LIKE %s
                        LIMIT %s OFFSET %s;
                        """,
                        (("%" + input_word + "%"), per_page, offset),
                    )

                    bookIds = cur.fetchall()
                    if bookIds:
                        return bookIds, page_count
                    return None
                except Exception as e:
                    print(str(e))
                    raise e
                finally:
                    cur.close()
                    conn.close()

    @staticmethod
    def get_bookCard_by_id(bookid: int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """SELECT bookid, title, cover FROM books 
                WHERE bookID = %s
                """
                try:
                    cur.execute(query, (bookid,))
                    book_data = cur.fetchone()  # only one book
                    if book_data:
                        return book_data
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()
