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
                "SELECT * FROM author WHERE authorid = %s",
                (authorid),
            )

            author_data = cursor.fetchone()
            if author_data:
                author = Author(**author_data)
                return author
            return None
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_author(author: Author):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)   
        prompt = """
        INSERT INTO author (authorid, name, wiki_link, image, bio)
        VALUES (%s,%s,%s,%s,%s);
        """

        try:
            cursor.execute(
                prompt,
                author.authorID,
                author.name,
                author.wiki_link,
                author.image,
                author.bio
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

        prompt = """UPDATE author SET name = %s, wiki_link = %s, image = %s, bio = %s;
        """
        try:
            cursor.execute(
                prompt,
                (
                author.name,
                author.wiki_link,
                author.image,
                author.bio,
                author.authorID
                )
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod 
    def delete_author(authorid):
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "DELETE FROM author WHERE authorid = %s", (authorid)
            )
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
