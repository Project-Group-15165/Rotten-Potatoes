from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Progress
from app.services import ProgressService

bp = Blueprint("progress", __name__)

#not sure about route=userid
@bp.route("/userid/<userid>", methods=["GET"])
@jwt_required
def user_book_progress(identity, bookid):
    try:
        progress = ProgressService.get_progress(userid=identity["userid"], bookid=bookid)
        print(progress)
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    if progress:
        return jsonify(progress), 201
    else:
        return jsonify({"message": "no progress"}), 404

#user and book id are composite, do i create this key for every book automatically
#book id can be added with get json, not sure
@bp.route("/userid/<userid>", methods=["POST"])
@jwt_required
def add_progress(identity, bookid):
    data = request.get_json()
    status = data.get("reading status")
    pages_read = data.get("pages read")
    started = data.get("started reading")
    finished = data.get("finished reading")
    #names may need to be updated
    progress = Progress(userid=identity["userid"], bookid=bookid, status=status, 
                        pages_read=pages_read, started_reading=started, finished_reading=finished)

    try:
        ProgressService.add_progress(progress=progress)
    except Exception as e:
        return jsonify({"message": "failed adding progress"}), 500
    
    return jsonify({"message:", "progress added"}), 201


#update progress
@bp.route("/userid/<userid>", methods=["PUT"])
@jwt_required
def update_progress(identity, bookid):
    userid=identity["userid"]
    progress = ProgressService.get_progress(userid=userid, bookid=bookid)
    data = request.get_json()
    # not everything need to be updated, check this part
    progress.reading_status = data.get("reading_status")
    progress.pages_read = data.get("pages_read")
    progress.started_reading = data.get("started_reading")
    progress.finished_reading = data.get("finished_reading")
    try:
        ProgressService.update_progress(progress=progress)
    except Exception as e:
        return jsonify({"message": "update progress failed"}), 500
    
    return jsonify({"message": "progress updated"}), 200

#delete progress
@bp.route("/userid/<userid>", methods=["DELETE"])
@jwt_required
def delete_progress(identity, bookid):
    userid=identity["userid"]
    progress = ProgressService.get_progress(userid=userid, bookid=bookid)
    if not progress:
        return jsonify({"message:", "progress not found"}), 404
    try:
        ProgressService.delete_progress(userid=userid, bookid=bookid)
    except Exception as e:
        return jsonify({"message:", "progress cannot be deleted"}), 200

