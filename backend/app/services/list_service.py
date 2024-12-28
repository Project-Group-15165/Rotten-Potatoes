import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection


class ListService:
    @staticmethod
    def get_all_user_lists(userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
                SELECT listid,list_name 
                FROM lists 
                WHERE userid = %s
                ORDER BY listid;
                """
        try:
            # postgres converts identifiers to lowercase
            cursor.execute(query, (userid,))
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
        query = """
                SELECT bookid, added_on 
                FROM listitems 
                WHERE listid = %s;
                """
        try:
            # return book card info
            cursor.execute(query, (listid,))
            return cursor.fetchall() or []
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_book_list(userid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
                SELECT T1.listID, T1.list_name, T2.bookID
                FROM (SELECT listid, list_name from Lists WHERE userID = %s) as T1
                LEFT JOIN (SELECT bookID, listid from Listitems WHERE bookid = %s) as T2
				ON T1.listID = T2.listId;
                """
        try:
            cursor.execute(
                query,
                (userid, bookid),
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
        query = "INSERT INTO lists (userid, list_name) VALUES (%s, %s);"
        try:
            cursor.execute(
                query,
                (
                    userid,
                    list_name,
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
    def default_lists(userid):
        ListService.create_new_list("currently reading", userid)
        ListService.create_new_list("already read", userid)
        ListService.create_new_list("want to read", userid)

    @staticmethod
    def add_list_item(bookid, listid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = "INSERT INTO listitems (bookid, listid) VALUES (%s, %s);"
        try:
            cursor.execute(
                query,
                (
                    bookid,
                    listid,
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
                (
                    listid,
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
