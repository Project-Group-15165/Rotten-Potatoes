import psycopg2
from psycopg2.extras import RealDictCursor
from werkzeug.security import check_password_hash
from app.utils.db import get_db_connection
from app.models import User
from flask import jsonify


class UserService:

    @staticmethod
    def getuserbyid(userid: int) -> User:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM users WHERE userid =%s;",
                (userid,),
            )
            user_data = cursor.fetchone()
            if user_data:
                user = User(**user_data)
                return user
            raise UserNotFoundError
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_user_by_credentials(username: str, password: str) -> User:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM users WHERE username = %s;",
                (username,),
            )
            user_data = cursor.fetchone()
            if user_data and check_password_hash(user_data["password"], password):
                user = User(**user_data)
                return user
            raise UserNotFoundError
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_user_by_username(username: str):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(
                "SELECT * FROM users WHERE username = %s;",
                (username,),
            )
            user_data = cursor.fetchone()
            if user_data:
                user = User(**user_data)
                return jsonify(
                    {
                        "userid": user.userid,
                        "username": user.username,
                        "name": user.name,
                        "middle_name": user.middle_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "birthdate": user.birthdate,
                        "gender": user.gender,
                        "avatar": user.avatar,
                    }
                )
            raise UserNotFoundError
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_user(user: User):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """INSERT INTO users (username, name, middle_name, last_name, email, birthdate, gender, avatar, password)
	    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s);
        """
        try:
            cursor.execute(
                prompt,
                (
                    user.username,
                    user.name,
                    user.middle_name,
                    user.last_name,
                    user.email,
                    user.birthdate,
                    user.gender,
                    user.avatar,
                    user.password,
                ),
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def update_user(user: User):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = """UPDATE users
        SET username=%s, name=%s, middle_name=%s, last_name=%s, email=%s, gender=%s, avatar=%s
        WHERE userid =%s;
        """
        try:
            cursor.execute(
                prompt,
                (
                    user.username,
                    user.name,
                    user.middle_name,
                    user.last_name,
                    user.email,
                    user.gender,
                    user.avatar,
                    user.userid,
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
    def delete_user(
        userid,
    ):
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "DELETE FROM users WHERE userid =%s;",
                (userid,),
            )
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def new_login(
        userid,
    ):
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        prompt = "UPDATE users SET last_logged_in = NOW() WHERE userid=%s"
        try:
            cursor.execute(
                prompt,
                (userid,),
            )
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()


class UserNotFoundError(Exception):
    def __init__(self):
        self.message = f"User not found"
        super().__init__(self.message)
