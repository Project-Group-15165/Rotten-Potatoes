from flask import Blueprint, request, jsonify
from app.utils.auth import jwt_required
from app.models import Progress
from app.services import ProgressService

bp = Blueprint("progress", __name__)

@bp.route("/all", methods=["GET"])
@jwt_required
def get_all_progress_of_user(identity):
    try:
        progress_list = ProgressService.get_all_progress_of_user(userid=identity["userid"])
        if not progress_list:
            return jsonify({"message": "No progress found"}), 404
        return jsonify(progress_list), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/<bookid>", methods=["GET"])
@jwt_required
def get_progress(identity, bookid):
    try:
        progress, percentage = ProgressService.get_progress(userid=identity["userid"], bookid=bookid)
        if not progress:
            return jsonify({"message": "Progress not found"}), 404
        response_data = progress.__dict__
        response_data["percentage_read"] = percentage
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/<bookid>/add", methods=["POST"])
@jwt_required
def add_progress(identity, bookid):
    data = request.get_json()
    try:
        progress = Progress(
            userid=identity["userid"],
            bookid=bookid,
            notes=data.get("notes"),
            pages_read=data.get("pages_read"),
            started_reading=data.get("started_reading"),
            finished_reading=data.get("finished_reading"),
        )
        ProgressService.add_progress(progress)
        return jsonify({"message": "Progress added"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/<bookid>/update", methods=["PUT"])
@jwt_required
def update_progress(identity, bookid):
    try:
        progress, _ = ProgressService.get_progress(userid=identity["userid"], bookid=bookid)
        if not progress:
            return jsonify({"message": "Progress not found"}), 404
        data = request.get_json()
        for key, value in data.items():
            if hasattr(progress, key):
                setattr(progress, key, value)
        ProgressService.update_progress(progress)
        return jsonify({"message": "Progress updated"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/<bookid>/delete", methods=["DELETE"])
@jwt_required
def delete_progress(identity, bookid):
    try:
        progress, _ = ProgressService.get_progress(userid=identity["userid"], bookid=bookid)
        if not progress:
            return jsonify({"message": "Progress not found"}), 404
        ProgressService.delete_progress(userid=identity["userid"], bookid=bookid)
        return jsonify({"message": "Progress deleted"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
