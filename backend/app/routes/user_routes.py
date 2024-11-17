from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import User
from app.services import UserService

bp = Blueprint("user", __name__)


@bp.route("/profile", methods=["GET"])
@jwt_required
def userprofile(identity):
    userid = identity["userid"]
    try:
        user = UserService.getuserbyid(userid=userid)
        return jsonify(user), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/profile/update", methods=["POST"])
@jwt_required
def update_profile(identity):
    data = request.get_json()
    userid = identity["userid"]
    try:
        user = User(
            userid=userid,
            username=data.get("username"),
            name=data.get("name"),
            last_name=data.get("last_name"),
            middle_name=data.get("middle_name"),
            email=data.get("email"),
            birthdate=data.get("birthdate"),
            avatar=data.get("avatar"),
            gender=data.get("gender"),
            password=data.get("password"),
        )
    except Exception as e:
        return jsonify({"message": "Not enough arguments for the update"}), 400
    try:
        UserService.update_user(user=user)
        return jsonify({"message": "Updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/profile/delete", methods=["POST"])
@jwt_required
def delete_profile(identity):
    userid = identity["userid"]
    try:
        UserService.delete_user(userid=userid)
        return jsonify({"message": "Deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/<username>", methods=["GET"])
def userpage(username):
    try:
        info = UserService.get_user_by_username(username=username)
        if info:
            return info, 200
        return jsonify({"message": "No such user"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
