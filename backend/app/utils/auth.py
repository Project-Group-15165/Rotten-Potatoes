from flask import Blueprint, request, jsonify, current_app
from functools import wraps
import jwt
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash
from app.models import User
from app.services import UserService, UserNotFoundError, ListService

bp = Blueprint("auth", __name__)


def create_access_token(identity):
    expiration = datetime.now(timezone.utc) + timedelta(
        seconds=current_app.config["JWT_ACCESS_TOKEN_EXPIRES"]
    )
    token = jwt.encode(
        {"identity": identity, "exp": expiration},
        current_app.config["JWT_SECRET_KEY"],
        algorithm="HS256",
    )
    return token


def decode_access_token(token):
    payload = jwt.decode(
        token,
        current_app.config["JWT_SECRET_KEY"],
        algorithms=["HS256"],
        options={
            "verify_signature": True,
            "verify_exp": True,
            "require": ["identity", "exp"],
        },
    )
    return payload


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    password = data.get("password")
    birthdate = data.get("birthdate")
    hashed_password = generate_password_hash(password)
    user = User(
        username=data.get("username"),
        name=data.get("name"),
        middle_name=data.get("middle_name"),
        last_name=data.get("last_name"),
        email=data.get("email"),
        birthdate=datetime.strptime(birthdate, "%Y-%m-%d"),
        gender=data.get("gender"),
        avatar=data.get("avatar"),
        password=hashed_password,
    )
    try:
        id = UserService.add_user(user)
        ListService.default_lists(id)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "success"}), 201


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        user = UserService.get_user_by_credentials(username=username, password=password)
        access_token = create_access_token(
            {"username": user.username, "userid": user.userid}
        )

    except UserNotFoundError:
        return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error logging in"}), 500

    UserService.new_login(user.userid)
    return jsonify(access_token=access_token), 200


def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"message": "Missing authorization header"}), 401

        token = auth_header.split(" ")[1]
        try:
            payload = decode_access_token(token=token)
            identity = payload["identity"]
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(identity, *args, **kwargs)

    return decorated_function


@bp.route("/test", methods=["GET"])
@jwt_required
def test(identity):

    return jsonify({"message": identity}), 200
