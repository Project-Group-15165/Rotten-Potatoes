import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import List

class ListService:

    @staticmethod
    def get_all_user_lists(userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            #postgres converts identifiers to lowercase
            cursor.execute(
                """
                SELECT lists.listid, list_name 
                FROM lists 
                JOIN userlists ON userlists.listid = lists.listid 
                WHERE userlists.userid = %s;
                """,
                (userid,)
            )
            list_data = cursor.fetchall()
            if list_data:
                return list_data
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    
    @staticmethod
    def get_list_items(listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            # do i need book name?
            # return book card info
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
                "INSERT INTO lists (list_name) VALUES (%s) RETURNING listid;",
                (list_name,)
            )
            listid = cursor.fetchone()['listid']
            cursor.execute(
                "INSERT INTO userlists (userid, listid) VALUES (%s, %s);",
                (userid, listid,)
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def default_lists(userid):
        ListService.create_new_list("currently reading", userid)
        ListService.create_new_list("already read", userid)
        ListService.create_new_list("want to read", userid)

    @staticmethod
    def add_list_item(bookid, listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "INSERT INTO listitems (bookid, listid) VALUES (%s, %s);",
                (bookid, listid,)
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def rename_list(listid, new_name):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            UPDATE lists
            SET list_name = %s
            WHERE listid = %s;
        """
        try:
            cursor.execute(query, (new_name, listid))
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
     
    @staticmethod
    def delete_list(listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            # Check if it is one of the default lists
            cursor.execute("SELECT list_name FROM lists WHERE listid = %s;", (listid,))
            result = cursor.fetchone() 
            if not result:
                raise Exception("List not found")
            name = result["list_name"]

            if name in ["currently reading", "already read", "want to read"]:
                raise Exception(f"Cannot delete default list: {name}")

            cursor.execute("DELETE FROM lists WHERE listid = %s;", (listid,))
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
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
                (listid, bookid,)
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
