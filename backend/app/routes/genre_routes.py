from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Genre
from app.services import GenreService
from app.models import Book

# from app.services import BookService


bp = Blueprint("genre", __name__)


@bp.route("/getbyid/<genreid>", methods=["GET"])
def get_genre(genreid):
    try:
        genres = GenreService.get_genre_by_id(genreid=genreid)
        print(genres)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if genres:
        return jsonify(genres), 201
    else:
        return jsonify({"message": "no genres"}), 404


@bp.route("/add", methods=["POST"])
@jwt_required
def add_genre(identity):  # do i need jwt&identity when adding genre?
    data = request.get_json()
    name = data.get("name")
    genre = Genre(name=name)
    try:
        GenreService.add_genre(genre=genre)
    except Exception as e:
        return jsonify({"message": "error can't add genre"}), 500

    return jsonify({"message": "success: genre added"}), 201


@bp.route("/update/<genreid>", methods=["PUT"])
@jwt_required
def update_genre(identity, genreid):
    genre = GenreService.get_genre_by_id(genreid=genreid)
    data = request.get_json()
    genre.name = data.get("name")
    try:
        GenreService.update_genre(genre=genre)
    except Exception as e:
        return jsonify({"message": "error can't update genre"}), 500

    return jsonify({"message": "success updated genre"}), 200


@bp.route("/delete/<genreid>", methods=["DELETE"])
@jwt_required
def delete_review(identity, genreid):
    genre = GenreService.get_genre_by_id(genreid=genreid)
    if not genre:
        return jsonify({"message": "no genre to delete"}), 404
    try:
        GenreService.delete_genre(genreid=genreid)
    except Exception as e:
        return jsonify({"message": "error can't delete genre"}), 500

    return jsonify({"message": "success: deleted genre"}), 200


@bp.route("/getallgenres", methods=["GET"])
def all_genres():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    input_word = request.args.get("input_word", "", type=str).lower()
    try:
        Genreids = GenreService.get_all_genres(
            page_number=page, per_page=per_page, input_word=input_word
        )
    except Exception as e:
        return jsonify({"message": "error can't get genres" + str(e)}), 500

    if Genreids:
        return jsonify(Genreids), 201
    else:
        return jsonify({"message": "no genres"}), 404


@bp.route("/genreid/<genreid>", methods=["GET"])
def book_by_genreid(genreid):
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    try:
        books = GenreService.get_all_books_of_genre(
            genreid=genreid, per_page=per_page, page_number=page
        )

    except Exception as e:
        return jsonify({"message": str(e)}), 500
    if books:
        # return jsonify(books, total_count, page_count), 201
        return jsonify(books), 201
    else:
        return jsonify({"message": "no books"}), 404
