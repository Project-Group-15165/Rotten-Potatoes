from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Progress
from app.services import ProgressService

bp = Blueprint("progress", __name__)

#pages read must be an integer between 0-num of pages

@bp.route("/all", methods=["GET"])
@jwt_required
def get_all_progress_of_user(identity):
    try:
        progress_list = ProgressService.get_all_progress_of_user(userid=identity["userid"])
        if not progress_list:
            return jsonify({"message": "Progress not found"}), 404
        return jsonify(progress_list), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@bp.route("/<bookid>", methods=["GET"])
@jwt_required
def get_progress(identity, bookid):
    try:
        progress = ProgressService.get_progress(userid=identity["userid"], bookid=bookid)
        if not progress:
            return jsonify({"message": "Progress not found"}), 404
        return jsonify(progress), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

#check if data is valid for all parameters
#drop down menu for reading status, there are three of them
@bp.route("/<bookid>/add", methods=["POST"])
@jwt_required
def add_progress(identity, bookid):
    data = request.get_json()
    progress = Progress(
        userid=identity["userid"],
        bookid=bookid,
        notes=data.get("notes"),
        pages_read=data.get("pages_read"),
        started_reading=data.get("started_reading"),
        finished_reading=data.get("finished_reading"),
    )
    try:
        ProgressService.add_progress(progress)
        return jsonify({"message": "Progress added"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

#even if data section is empty, it gets updated, not sure if its a problem
@bp.route("/<bookid>/update", methods=["PUT"])
@jwt_required
def update_progress(identity, bookid):
    userid = identity["userid"]
    progress = ProgressService.get_progress(userid=userid, bookid=bookid)
    if not progress:
        return jsonify({"message": "Progress not found"}), 404
    data = request.get_json()
    fields_to_update = ["reading_status", "pages_read", "started_reading", "finished_reading"]
    for field in fields_to_update:
        if field in data:
            setattr(progress, field, data[field])
    try:
        ProgressService.update_progress(progress)
        return jsonify({"message": "Progress updated"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/<bookid>/delete", methods=["DELETE"])
@jwt_required
def delete_progress(identity, bookid):
    userid = identity["userid"]
    progress = ProgressService.get_progress(userid=userid, bookid=bookid)
    if not progress:
        return jsonify({"message": "Progress not found"}), 404
    try:
        ProgressService.delete_progress(userid=userid, bookid=bookid)
        return jsonify({"message": "Progress deleted"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500