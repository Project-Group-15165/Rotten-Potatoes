from flask import Blueprint, request, jsonify
from app.utils.auth import jwt_required
from app.models import userBook
from app.services import UserBookService

bp = Blueprint("userBooks", __name__)

#get specific 
@bp.route("/userid/<userid>", methods=["GET"])
def get_userBook(identity, bookid):
    try:
        books = UserBookService.get_userBook(userid=identity["userid"], bookid=bookid)
        if books:
            return jsonify(books), 201
        return jsonify({"message": "book not found"}), 404
    except Exception as e:
        return jsonify({"message": f"Error fetching book: {str(e)}"}), 500

@bp.route("/userid/<userid>/add", methods=["POST"])
@jwt_required
def add_userBook(identity):
    try:
        data = request.get_json()

        new_book = userBook(
            userid=identity["userid"],
            title=data.get("title"),
            cover=data.get("cover"),
            description=data.get("description"),
            format=data.get("format"),
            page_numbers=data.get("page_numbers"),
            pub_date=data.get("pub_date"),   
        )

        UserBookService.add_userBook(new_book)
        return jsonify({"message": "Book added successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"Error adding book: {str(e)}"}), 500

@bp.route("/<userid>/update", methods=["PUT"])
@jwt_required
def update_userBook(identity, bookid):

    userid=identity["userid"]
    userBook = UserBookService.get_userBook(userid=userid, bookid=bookid)
    data = request.get_json()
    userBook.userid = userid
    userBook.bookid = data.get("bookid")
    userBook.title = data.get("title")
    userBook.cover = data.get("cover")
    userBook.description = data.get("decription")
    userBook.format = data.get("format")
    userBook.page_numbers = data.get("page_numbers")
    try:
        UserBookService.update_userBook(userBook=userBook)
    except Exception as e:
        return jsonify({"message": "error can't update userbook"}), 500

    return jsonify({"message": "success"}), 200

@bp.route("/<userid>/delete", methods=["DELETE"])
@jwt_required
def delete_userBook(identity, bookid):
    userid = identity["userid"]
    review = UserBookService.get_userBook(userid=userid, bookid=bookid)
    if not review:
        return jsonify({"message": "no review to delete"}), 404
    try:
        UserBookService.delete_user_book(userid=userid, bookid=bookid)
    except Exception as e:
        return jsonify({"message": "error can't delete review"}), 500

    return jsonify({"message": "success"}), 200
