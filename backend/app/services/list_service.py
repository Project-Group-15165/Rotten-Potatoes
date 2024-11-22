import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import List

#default three lists:
#reading
#read
#read later

class ListService:
    @staticmethod
    def get_all_user_lists(userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                """
                SELECT list_name 
                FROM lists 
                JOIN userlists ON userlists.listid = lists.listid 
                WHERE userlists.userid = %s;
                """,
                (userid,)
            )
            return cursor.fetchall() or []
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    
    #assuming we have listid, if we dont idk 
    @staticmethod
    def get_list_items(listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                """
                SELECT bookid, added_on 
                FROM listitems 
                WHERE listid = %s;
                """,
                (listid,)
            )
            return cursor.fetchall() or []
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def create_new_list(list_name, userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "INSERT INTO lists (listid, list_name) VALUES (null, %s) RETURNING listid;",
                (list_name)
            )
            listid = cursor.fetchone()['listid']
            cursor.execute(
                "INSERT INTO userlists (userid, listid) VALUES (%s, %s);",
                (userid, listid)
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    #added on is not necessary
    @staticmethod
    def add_list_item(bookid, listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "INSERT INTO listitems (bookid, listid) VALUES (%s, %s);",
                (bookid, listid)
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def rename_list(list_id, new_name):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            UPDATE Lists
            SET list_name = %s
            WHERE listID = %s;
        """
        try:
            cursor.execute(query, (new_name, list_id))
            conn.commit()
            print("List name updated.")
        except Exception as e:
            print(f"Error updating list name: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
     
    @staticmethod
    def delete_list(listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute("DELETE FROM lists WHERE listid = %s;", (listid,))
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def delete_list_item(listid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "DELETE FROM listitems WHERE listid = %s AND bookid = %s;",
                (listid, bookid)
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
