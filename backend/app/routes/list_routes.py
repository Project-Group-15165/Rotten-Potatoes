from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.services import ListService

bp = Blueprint("list", __name__)

# Get all lists for a user
@bp.route("/lists", methods=["GET"])
@jwt_required
def get_lists(identity):
    try:
        all_lists = ListService.get_all_user_lists(userid=identity["userid"])
        if not all_lists:
            return jsonify({"message": "Lists not found"}), 404
        return jsonify(all_lists), 200
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500

# Get all books in a list
@bp.route("/lists/<listid>/books", methods=["GET"])
@jwt_required
def get_list_items(identity, listid):
    try:
        books = ListService.get_list_items(listid=listid)
        if not books:
            return jsonify({"message": "Books not found"}), 404
        return jsonify(books), 200
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500

# Create a new list
@bp.route("/lists", methods=["POST"])
@jwt_required
def create_new_list(identity):
    list_name = request.get_json().get("list_name")
    if not list_name:
        return jsonify({"message": "List name is required"}), 400
    try:
        ListService.create_new_list(list_name=list_name, userid=identity["userid"])
        return jsonify({"message": "List created"}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500

# Add a book to a list
@bp.route("/lists/<listid>/books", methods=["POST"])
@jwt_required
def add_list_item(identity, listid):
    bookid = request.get_json().get("bookid")
    if not bookid:
        return jsonify({"message": "Book ID is required"}), 400
    try:
        ListService.add_list_item(bookid=bookid, listid=listid)
        return jsonify({"message": "Book added to the list"}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500

# Rename a list
@bp.route("/lists/<listid>", methods=["PUT"])
@jwt_required
def rename_list(identity, listid):
    new_name = request.get_json().get("new_name")
    if not new_name:
        return jsonify({"message": "New name is required"}), 400
    try:
        ListService.rename_list(listid=listid, new_name=new_name)
        return jsonify({"message": "List renamed"}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500

# Delete a list
@bp.route("/lists/<listid>", methods=["DELETE"])
@jwt_required
def delete_list(identity, listid):
    try:
        ListService.delete_list(listid=listid)
        return jsonify({"message": "List deleted"}), 204
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500

# Remove a book from a list
@bp.route("/lists/<listid>/books/<bookid>", methods=["DELETE"])
@jwt_required
def delete_list_item(identity, listid, bookid):
    try:
        ListService.delete_list_item(listid=listid, bookid=bookid)
        return jsonify({"message": "Book removed from list"}), 204
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500
