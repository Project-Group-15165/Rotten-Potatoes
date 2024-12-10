import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Genre


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
