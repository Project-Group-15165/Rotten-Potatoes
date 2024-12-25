from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.services import ListService
from app.models import Progress
from app.services import ProgressService

bp = Blueprint("list", __name__)

# Identity should be passed as first argument if jwt_required


# Get all lists for a user
@bp.route("/all", methods=["GET"])
@jwt_required
def get_lists(identity):
    try:
        all_lists = ListService.get_all_user_lists(userid=identity["userid"])
        return jsonify(all_lists), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Get all books in a list
@bp.route("/<listid>/books", methods=["GET"])
@jwt_required
def get_list_items(identity, listid):
    try:
        books = ListService.get_list_items(listid=listid)
        return jsonify(books), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Get the lists where the book exists
@bp.route("/<bookid>/getlistsofbook", methods=["GET"])
@jwt_required
def get_book_list(identity, bookid):
    try:
        lists = ListService.get_book_list(userid=identity["userid"], bookid=bookid)
        return jsonify(lists), 200
        # It can be empty, no problem
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Create a new list
@bp.route("/create", methods=["POST"])
@jwt_required
def create_new_list(identity):
    list_name = request.get_json().get("list_name")
    if not list_name:
        return jsonify({"message": "List name is required"}), 400
    if list_name in ["currently reading", "already read", "want to read"]:
        return jsonify({"message": "List name cannot be a default list name"})
    try:
        ListService.create_new_list(list_name=list_name, userid=identity["userid"])
        return jsonify({"message": "List created"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route("/createdefault", methods=["POST"])
@jwt_required
def create_default(identity):
    try:
        ListService.default_lists(userid=identity["userid"])
        return jsonify({"message": " Default lists created"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Add a book to a list
@bp.route("/<listid>/addbook", methods=["POST"])
@jwt_required
def add_list_item(identity, listid):
    bookid = request.get_json().get("bookid")
    if not bookid:
        return jsonify({"message": "Book ID is required"}), 400
    try:
        ListService.add_list_item(bookid=bookid, listid=listid)

        default_progress = Progress(
            userid=identity["userid"],
            bookid=bookid,
        )
        progress = ProgressService.get_progress(
            bookid=bookid, userid=identity["userid"]
        )
        if not progress:
            ProgressService.add_progress(default_progress)
        return jsonify({"message": "Book added to the list and progress created"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Rename a list
@bp.route("/<listid>/rename", methods=["PUT"])
@jwt_required
def rename_list(identity, listid):
    new_name = request.get_json().get("new_name")
    if not new_name:
        return jsonify({"message": "New name is required"}), 400
    if new_name in ["currently reading", "already read", "want to read"]:
        return jsonify({"message": "New name cannot be a default list name"})
    try:
        ListService.rename_list(listid, new_name)
        return jsonify({"message": "List renamed"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Delete a list
@bp.route("/delete/<listid>", methods=["DELETE"])
@jwt_required
def delete_list(identity, listid):
    try:
        ListService.delete_list(listid=listid)
        # 204 is for deletion but the message is not displayed (no content status code)
        return jsonify({"message": "List deleted"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Remove a book from a list
# Not sure if bookid should be given as parameter
# or get with json as in add book
@bp.route("/delete/<listid>/<bookid>", methods=["DELETE"])
@jwt_required
def delete_list_item(identity, listid, bookid):
    try:
        ListService.delete_list_item(listid=listid, bookid=bookid)
        return jsonify({"message": "Book removed from list"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
