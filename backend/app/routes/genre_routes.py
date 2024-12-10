from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Genre
from app.services import GenreService

bp = Blueprint("genre", __name__)


@bp.route("/<genreid>", methods=["GET"])
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
def add_genre(identity):   #do i need jwt&identity when adding genre?
    data = request.get_json()
    name = data.get("name")
    genre = Genre(
        name=name
    )
    try:
        GenreService.add_genre(genre=genre)
    except Exception as e:
        return jsonify({"message": "error can't add genre"}), 500

    return jsonify({"message": "success: genre added"}), 201


@bp.route("/<genreid>/update", methods=["PUT"])
@jwt_required
def update_genre(identity,genreid):
    genre = GenreService.get_genre_by_id(genreid=genreid)
    data = request.get_json()
    genre.name = data.get("name")
    try:
        GenreService.update_genre(genre=genre)
    except Exception as e:
        return jsonify({"message": "error can't update genre"}), 500

    return jsonify({"message": "success updated genre"}), 200


@bp.route("/<genreid>/delete", methods=["DELETE"])
@jwt_required
def delete_review(identity,genreid):
    genre = GenreService.get_genre_by_id(genreid=genreid)
    if not genre:
        return jsonify({"message": "no genre to delete"}), 404
    try:
        GenreService.delete_genre(genreid=genreid)
    except Exception as e:
        return jsonify({"message": "error can't delete genre"}), 500

    return jsonify({"message": "success: deleted genre"}), 200
