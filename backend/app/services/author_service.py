import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Author

class AuthorService:
    
    @staticmethod
    def get_author(authorid):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM authors WHERE authorid = %s",
                (authorid),
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
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                prompt = """
                INSERT INTO authors (name, wiki_link, image, description, summary)
                VALUES (%s,%s,%s,%s,%s);
                """
                try:
                    cursor.execute(
                    prompt,
                    (author.name, author.wiki_link, author.image, author.description, author.summary)
                    )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cursor.close()
                    conn.close()

    @staticmethod
    def update_author(author: Author):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                prompt = """UPDATE authors SET name = %s, wiki_link = %s, image = %s, description = %s, summary = %s
                WHERE authorid=%s
                """
                try:
                    cursor.execute(
                            prompt,
                            (author.name, author.wiki_link, author.image, author.description, author.summary, author.authorid)
                    )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cursor.close()
                    conn.close()

    @staticmethod 
    def delete_author(authorid):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                try:
                    cursor.execute(
                        "DELETE FROM authors WHERE authorid = %s", (authorid)
                    )
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cursor.close()
                    conn.close()
