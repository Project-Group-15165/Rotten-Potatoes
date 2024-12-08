import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Author


class AuthorService:

    @staticmethod
    def get_author(authorid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM authors WHERE authorid = %s",
                (authorid,),
            )

            author_data = cursor.fetchone()
            if author_data:
                author = Author(**author_data)
                return author
            return None
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_author(author: Author):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """
        INSERT INTO authors (authorid, name, wiki_link, image, bio)
        VALUES (%s,%s,%s,%s,%s);
        """

        try:
            cursor.execute(
                prompt,
                (
                    author.authorid,
                    author.name,
                    author.wiki_link,
                    author.image,
                    author.description,
                ),
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def update_author(author: Author):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        prompt = """UPDATE authors SET name = %s, wiki_link = %s, image = %s, description= %s, summary=%s
                WHERE authorid =%s;
                """
        try:
            cursor.execute(
                prompt,
                (
                    author.name,
                    author.wiki_link,
                    author.image,
                    author.description,
                    author.summary,
                    author.authorid,
                ),
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def delete_author(authorid : int):
        conn = get_db_connection()
        cursor = conn.cursor()
        prompt = """DELETE FROM authors WHERE authorid = %s;"""
        try:
            cursor.execute(prompt, (authorid,))
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_authorCard(authorid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT authorid, name, image FROM authors WHERE authorid = %s",
                (authorid,),
            )

            author_data = cursor.fetchone()
            if author_data:
                return author_data
            return None
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()
