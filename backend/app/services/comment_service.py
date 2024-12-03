import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Comment

class CommentService:
    
    @staticmethod
    def get_all_comments_of_book(bookid : int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                try:
                    cur.execute(
                        "SELECT * FROM Comments WHERE bookid =%s;",
                        (bookid,)
                    )
                    all_comments = cur.fetchall()
                    if all_comments:
                        comments = [Comment(**comment) for comment in all_comments]
                        return comments
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()
    
    @staticmethod
    def get_all_comments_of_user(userid : int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                try:
                    cur.execute(
                        "SELECT * FROM Comments WHERE userid =%s;",
                        (userid)
                    )
                    all_comments = cur.fetchall()
                    if all_comments:
                        comments = [Comment(**comment) for comment in all_comments]
                        return comments
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()
    
    @staticmethod
    def get_comment(userid, bookid):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:    
                try:
                    cur.execute(
                        "SELECT * FROM Comments WHERE userid =%s And bookid =%s;",
                        (
                            userid,
                            bookid,
                        ),
                    )
                    comment_data = cur.fetchone()
                    if comment_data:
                        comment = Comment(**comment_data)
                        return comment
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()        
                    
    @staticmethod
    def add_comment(comment : Comment):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """INSERT INTO comments(userid, bookid,content, creation_date, spoiler)
                VALUES (%s, %s, %s, %s, %s)"""
                try:
                    cur.execute(
                        query,
                        (
                            comment.userid,
                            comment.bookid,
                            comment.content,
                            comment.creation_date,
                            comment.spoiler
                        ),
                    )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()
                    
    @staticmethod
    def update_comment(comment : Comment):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # No need to add the comment id since for each user, one comment
                query = """UPDATE comments SET 
                    content=%s, creation_date= now(), spoiler=%s
                    WHERE bookID=%s AND userid=%s 
                """ 
                try:
                    cur.execute(
                        query,
                        (
                            comment.content,
                            comment.spoiler,
                            comment.bookid,
                            comment.userid
                        ),
                    )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()
                    
    @staticmethod
    def delete_comment(commentid : int):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = "DELETE FROM comments WHERE commentid=%s"
                try:
                    cur.execute(query,(commentid,))
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    raise e
                finally:
                    cur.close()
                    conn.close()
                
            
            
    
            