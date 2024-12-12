import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from app.models import Comment
from math import ceil

class CommentService:
    
    @staticmethod
    def get_all_comments_of_book(bookid : int, page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                try:
                    cur.execute(
                        "SELECT count(*) FROM Comments WHERE bookid =%s;",
                        (bookid,),
                    )
                    result = cur.fetchone()
                    total_count = result["count"] if result else 0

                    page_count = ceil((total_count) / per_page)

                    if page_number > page_count:
                        return [], page_count, page_count
                    
                    cur.execute(
                        """SELECT commentid FROM comments 
                        WHERE bookid =%s
                        LIMIT %s OFFSET %s;
                        """,
                        (bookid, per_page, offset),
                    )
                    
                    commentIds = cur.fetchall()
                    if commentIds:
                        return commentIds
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()
    
    @staticmethod
    def get_all_comments_of_user(userid : int, page_number, per_page):
        offset = (page_number - 1) * per_page
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                try:
                    cur.execute(
                        "SELECT count(*) FROM Comments WHERE userid =%s;",
                        (userid,),
                    )
                    result = cur.fetchone()
                    total_count = result["count"] if result else 0

                    page_count = ceil((total_count) / per_page)

                    if page_number > page_count:
                        return [], page_count, page_count
                    
                    cur.execute(
                        """SELECT commentid FROM comments 
                        WHERE userid =%s
                        LIMIT %s OFFSET %s;
                        """,
                        (userid, per_page, offset),
                    )
                    
                    commentIds = cur.fetchall()
                    if commentIds:
                        return commentIds
                    return None
                except Exception as e:
                    raise e
                finally:
                    cur.close()
                    conn.close()
                    
    
    @staticmethod
    def get_comment(commentid):
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:    
                try:
                    cur.execute(
                        """SELECT T1.*,T2.username,T2.avatar 
                        FROM comments as T1 
                        JOIN users as T2 ON T1.userid = T2.userid
                        WHERE T1.commentid=%s;
                        """,
                        (commentid,), # no need for book title, we already have it
                    )
                    comment_data = cur.fetchone()
                    if comment_data:
                        return comment_data
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
                
            
            
    
            