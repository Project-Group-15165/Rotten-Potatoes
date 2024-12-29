from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Book
from app.services import BookService

bp = Blueprint("book", __name__)


@bp.route("/add", methods=["POST"])
@jwt_required
def add_book(identity):
    data = request.get_json()
    title = data.get("title")
    cover = data.get("cover")
    description = data.get("description")
    format = data.get("format")
    page_numbers = data.get("page_numbers")
    pub_date = data.get("pub_date")
    goodreads_rating = data.get("goodreads_rating")
    book = Book(
        title=title,
        cover=cover,
        description=description,
        format=format,
        page_numbers=page_numbers,
        pub_date=pub_date,
        goodreads_rating=goodreads_rating,
    )
    try:
        bookid = BookService.add_book(book=book)
        BookService.add_bookGenre(data.get("genres"),bookid)
        BookService.add_bookAuthor(data.get("authors"),bookid)
    except Exception as e:
        return jsonify({"message": "error can't add book " + str(e)}), 500

    return jsonify({"message": "success", "bookid" : bookid}), 201


@bp.route("/<bookid>/update", methods=["PUT"])
@jwt_required
def update_book(identity, bookid):
    data = request.get_json()
    try:
        BookService.update_book(data)
    except Exception as e:
        return jsonify({"message": "error can't update book " + str(e)}), 500

    return jsonify({"message": "success"}), 200


@bp.route("/<bookid>/delete", methods=["DELETE"])
@jwt_required
def delete_book(identity, bookid):
    book = BookService.BookinfoForm(bookid)
    if not book:
        return jsonify({"message": "no book to delete"}), 404
    try:
        BookService.delete_book(bookid=bookid)
    except Exception as e:
        return jsonify({"message": "error can't delete book" + str(e)}), 500

    return jsonify({"message": "success"}), 200


@bp.route("/bookid/<bookid>", methods=["GET"])
def get_book_by_id(bookid):
    try:
        book = BookService.get_book_by_id(bookid)
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    if book:
        pub_date = str(book["pub_date"]).split("-")[::-1]
        book["pub_date"] = "-".join(x for x in pub_date)
        return jsonify(book), 201
    else:
        return jsonify({"message": "no such book"}), 404


@bp.route("/get/<bookid>", methods=["GET"])
def get_bookCard_by_id(bookid):
    try:
        book = BookService.get_bookCard_by_id(bookid)
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    if book:
        return jsonify(book), 201
    else:
        return jsonify({"message": "no such book"}), 404


@bp.route("/getallbooks", methods=["GET"])
def all_books():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    input_word = request.args.get("input_word","", type=str).lower()
    try:
        Booksids = BookService.get_all_books(
            page_number=page, per_page=per_page, input_word=input_word
        )
    except Exception as e:
        return jsonify({"message": "error can't get books" + str(e)}), 500

    if Booksids:
        return jsonify(Booksids), 201
    else:
        return jsonify({"message": "no reviews"}), 404
    
@bp.route("/getallbooksnameid", methods=["GET"])
def getallbooksnameid():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    input_word = request.args.get("input_word","", type=str).lower()
    try:
        Booksids = BookService.getallbooksnameid(
            page_number=page, per_page=per_page, input_word=input_word
        )
    except Exception as e:
        return jsonify({"message": "error can't get books" + str(e)}), 500

    if Booksids:
        return jsonify(Booksids), 201
    else:
        return jsonify({"message": "no reviews"}), 404
    
    
@bp.route("/bookinfoform/<bookid>", methods=["GET"])
def BookFormInfo(bookid):
    try:
        book = BookService.BookinfoForm(bookid)
        pub_date = str(book["pub_date"])
        book["pub_date"] = pub_date
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    if book:
        return jsonify(book), 201
    else:
        return jsonify({"message": "no such book"}), 404
