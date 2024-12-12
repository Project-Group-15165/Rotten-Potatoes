import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Book
from math import ceil

class BookService:
    @staticmethod
    def add_book(book : Book):              # we need to add genres tooo!!!!
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """INSERT INTO books( title, cover, description, format, page_numbers, pub_date, goodreads_rating)
                           VALUES ( %s, %s, %s, %s, %s, %s, %s )"""
                           
                try:      
                    cur.execute(query, (book.title, book.cover, book.description, book.format, book.page_numbers, book.pub_date, book.goodreads_rating))
                    conn.commit()
                
                
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()
                    
    @staticmethod
    def get_book_by_title(title : str):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT 
                        T1.title, 
                        T1.cover, 
                        T1.description, 
                        T1.format, 
                        T1.goodreads_rating, 
                        ARRAY_AGG(DISTINCT T3.name) AS genres, 
                        ARRAY_AGG(DISTINCT T5.name) AS authors, 
                        T1.page_numbers, 
                        T1.pub_date
                    FROM books AS T1
                    JOIN bookgenres AS T2 ON T1.bookID = T2.bookID
                    JOIN genres AS T3 ON T2.genreid = T3.genreid
                    JOIN bookauthors AS T4 ON T1.bookID = T4.bookID
                    JOIN authors AS T5 ON T4.authorid = T5.authorid
                    WHERE T1.title = %s
                    GROUP BY T1.bookID 
                """ 
                try:      
                    cur.execute(query, (title,))
                    book = cur.fetchone() #only one book
                    if book:
                        return book
                    return None
                except Exception as e:
                    raise e 
                finally:
                    cur.close()
                    conn.close()
                    
    @staticmethod
    def delete_book(bookid : int):
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
    def update_book(book : Book):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """UPDATE books SET 
                    title=%s, cover=%s, description=%s, format=%s, page_numbers=%s, pub_date=%s, goodreads_rating=%s
                    WHERE bookID=%s
                """ 
                try:      
                    cur.execute(query, ( book.title, book.cover, book.description, book.format, book.page_numbers, book.pub_date, book.goodreads_rating, book.bookid))
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
                    SELECT 
                        T1.title, 
                        T1.cover, 
                        T1.description, 
                        T1.format, 
                        T1.goodreads_rating, 
                        ARRAY_AGG(DISTINCT T3.name) AS genres, 
                        ARRAY_AGG(DISTINCT T5.name) AS authors, 
                        T1.page_numbers, 
                        T1.pub_date
                    FROM books AS T1
                    JOIN bookgenres AS T2 ON T1.bookID = T2.bookID
                    JOIN genres AS T3 ON T2.genreid = T3.genreid
                    JOIN bookauthors AS T4 ON T1.bookID = T4.bookID
                    JOIN authors AS T5 ON T4.authorid = T5.authorid
                    WHERE T1.bookID = %s
                    GROUP BY T1.bookID 
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
    def get_all_books(page_number, per_page):                         
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """SELECT count(*) FROM books """   
                try:      
                    cur.execute(query)
                    result = cur.fetchone()
                    total_count = result["count"] if result else 0

                    page_count = ceil((total_count) / per_page)

                    if page_number > page_count:
                        return [], page_count, page_count
                    
                    cur.execute(
                        """SELECT bookid FROM books 
                        LIMIT %s OFFSET %s;
                        """,
                        (per_page, offset),
                    )
                       
                    bookIds = cur.fetchall()
                    if bookIds:
                        return bookIds
                    return None
                except Exception as e:
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
                    book_data = cur.fetchone() #only one book
                    if book_data:
                        return book_data
                    return None
                except Exception as e:
                    raise e 
                finally:
                    cur.close()
                    conn.close()
        
       
    