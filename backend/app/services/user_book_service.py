import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import userBook

class UserBookService:
    @staticmethod
    def get_userBook(userid, bookid):   
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM userBooks WHERE userid = %s AND bookid = %s;",
                (userid, bookid,)
            )
            user_book_data = cursor.fetchone()
            if user_book_data:
                user_book = userBook(**user_book_data)
                return user_book
            return None
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_userBook(userBook: userBook):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)   
        prompt = """
        INSERT INTO userBooks (userid, title, cover, description, format, page_numbers, pub_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        """

        try:
            cursor.execute(
                prompt,
                (
                    userBook.userid,
                    userBook.title,
                    userBook.cover,
                    userBook.description,
                    userBook.format,
                    userBook.page_numbers,
                    userBook.pub_date,
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
    def update_userBook(userBook: userBook):   #update by using bookid and userid
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """
            UPDATE userBooks SET
                title = %s,
                cover = %s,
                description = %s,
                format = %s,
                page_numbers = %s,
                pub_date = %s
            WHERE userid = %s AND bookid = %s;
            """    
        try:
            cursor.execute(
                prompt,
                (
                    userBook.title,
                    userBook.cover,
                    userBook.description,
                    userBook.format,
                    userBook.page_numbers,
                    userBook.pub_date,
                    userBook.userid,
                    userBook.bookid,  
                )
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
    
    @staticmethod
    def delete_user_book(userid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor()
        prompt = """DELETE FROM userbooks WHERE userid =%s AND bookid = %s;"""
        try:
            cursor.execute(prompt, (userid, bookid,))
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
