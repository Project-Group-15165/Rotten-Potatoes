from flask import Blueprint, request, jsonify
from app.utils.auth import jwt_required
from app.models import userBook
from app.services import UserBookService
from datetime import datetime


bp = Blueprint("userBooks", __name__)

#get specific 
@bp.route("/<bookid>", methods=["GET"])
@jwt_required
def get_userBook(identity, bookid):
    # data = request.get_json()
    # bookid=data.get("bookid")
    try:
        books = UserBookService.get_userBook(userid=identity["userid"], bookid=bookid)
        if books:
            return jsonify(books), 201
        return jsonify({"message": "book not found"}), 404
    except Exception as e:
        return jsonify({"message": f"Error fetching book: {str(e)}"}), 500

@bp.route("/add", methods=["POST"])
@jwt_required
def add_userBook(identity):
    data = request.get_json()

    title = data.get("title")
    cover = data.get("cover")
    description = data.get("description")
    format = data.get("format")
    page_numbers = data.get("page_numbers")
    pub_date = data.get("pub_date")  
    
    new_book = userBook(
        userid=identity["userid"],  
        title=title,
        cover=cover,
        description=description,
        format=format,
        page_numbers=int(page_numbers),
        pub_date = datetime.strptime(pub_date, '%Y-%m-%d'),
    )
   
    try:
        UserBookService.add_userBook(userBook=new_book)
    except Exception as e:
        return jsonify({"message": f"Error adding book: {str(e)}"}), 500
    
    return jsonify({"message": "Book added successfully"}), 201

@bp.route("/update/<bookid>", methods=["PUT"])
@jwt_required
def update_userBook(identity, bookid):

    userid=identity["userid"]
    userBook = UserBookService.get_userBook(userid=identity["userid"], bookid=bookid)

    data = request.get_json()

    userBook.title = data.get("title")
    userBook.cover = data.get("cover")
    userBook.description = data.get("description")
    userBook.format = data.get("format")
    userBook.page_numbers = data.get("page_numbers")
    userBook.pub_date = datetime.strptime(data.get("pub_date"),'%Y-%m-%d')

    try:
        UserBookService.update_userBook(userBook=userBook)
    except Exception as e:
        return jsonify({"message": "error can't update userbook"}), 500

    return jsonify({"message": "success: userbook updated"}), 200

@bp.route("/delete/<bookid>", methods=["DELETE"])
@jwt_required
def delete_userBook(identity, bookid):
    userid = identity["userid"]
    userbook = UserBookService.get_userBook(userid, bookid)
    if not userbook:
        return jsonify({"message": "no review to delete"}), 404
    try:
        UserBookService.delete_user_book(userid=userid, bookid=bookid)
    except Exception as e:
        return jsonify({"message": "error can't delete review"+ str(e)}), 500
    return jsonify({"message": "success: userbook deleted"}), 200
