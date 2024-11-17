import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Book

class BookServices:
    @staticmethod
    def add_book(book : Book):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """INSERT INTO books(bookID, title, cover, description, format, page_numbers, pub_date, goodreads_rating)
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s )"""
                           
                try:      
                    cur.execute(query, (book.bookid, book.title, book.cover, book.description, book.format, book.page_numbers, book.pub_date, book.goodreads_rating))
                    conn.commit()
                
                
                except Exception as e:
                    print(f"Error: {e}")
                    conn.rollback()
                finally:
                    cur.close()
                    conn.close()
                    
    @staticmethod
    def get_book_by_title(book_title : str):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """SELECT * FROM books 
                WHERE title = %s
                """   
                try:      
                    cur.execute(query, (book_title))
                    conn.commit() 
                except Exception as e:
                    print(f"Error: {e}")
                    conn.rollback()
                finally:
                    cur.close()
                    conn.close()
                    
    @staticmethod
    def delete_book(book_id : int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    DELETE FROM books WHERE bookID = %s
                """ 
                try:      
                    cur.execute(query, (book_id))
                    conn.commit() 
                except Exception as e:
                    print(f"Error: {e}")
                    conn.rollback()
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
                    print(f"Error: {e}")
                    conn.rollback()
                finally:
                    cur.close()
                    conn.close()
                    
    