import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Progress


class ProgressService:

    @staticmethod
    def get_all_progress_of_user(userid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute("SELECT * FROM progress WHERE userid = %s;", (userid,))
            progress_data = cursor.fetchall()
            if progress_data:
                progress_list = [Progress(**row) for row in progress_data]
                return progress_list
            return []
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_progress(userid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM progress WHERE userid = %s And bookid = %s;",
                (
                    userid,
                    bookid,
                ),
            )
            progress_data = cursor.fetchone()
            if progress_data:
                progress = Progress(**progress_data)
                return progress
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_progress(progress: Progress):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """INSERT INTO progress (userid, bookid, notes, pages_read, started_reading, finished_reading)
        VALUES (%s,%s,%s,%s,%s,%s);
        """
        try:
            cursor.execute(
                prompt,
                (
                    progress.userid,
                    progress.bookid,
                    progress.notes,
                    progress.pages_read,
                    progress.started_reading,
                    progress.finished_reading,
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
    def update_progress(progress: Progress):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """UPDATE progress 
        SET notes = %s, pages_read = %s, started_reading = %s, finished_reading = %s
        WHERE userid = %s AND bookid = %s;
        """
        try:
            cursor.execute(
                prompt,
                (
                    progress.reading_status,
                    progress.pages_read,
                    progress.started_reading,
                    progress.finished_reading,
                    progress.userid,
                    progress.bookid,
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
    def delete_progress(userid, bookid):
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "DELETE FROM progress WHERE userid = %s And bookid = %s;",
                (userid, bookid),
            )
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
