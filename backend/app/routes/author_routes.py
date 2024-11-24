from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Author
from app.services import AuthorService

bp = Blueprint("author", __name__)

@bp.route("/authorid/<authorid>", methods=["GET"])
def get_author(authorid):
    try:
        author = AuthorService.get_author(authorid=authorid)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if author:
        return jsonify(author.to_dict()), 200
    else:
        return jsonify({"message": "Author not found"}), 404


@bp.route("/<authorid>/add", methods=["POST"])
@jwt_required
def add_author():
    data = request.get_json()
    author = Author(
        authorID=data.get("authorID"),
        name=data.get("name"),
        wiki_link=data.get("wiki_link"),
        image=data.get("image"),
        bio=data.get("bio")
    )
    try:
        AuthorService.add_author(author=author)
    except Exception as e:
        return jsonify({"message": "Error adding author"}), 500

    return jsonify({"message": "Author added successfully"}), 201


@bp.route("/<authorid>/update", methods=["PUT"])
@jwt_required
def update_author(authorid):
    data = request.get_json()
    author = AuthorService.get_author(authorid=authorid)
    if not author:
        return jsonify({"message": "Author not found"}), 404

    author.name = data.get("name", author.name)
    author.wiki_link = data.get("wiki_link", author.wiki_link)
    author.image = data.get("image", author.image)
    author.bio = data.get("bio", author.bio)

    try:
        AuthorService.update_author(author=author)
    except Exception as e:
        return jsonify({"message": "error cannot update author"}), 500

    return jsonify({"message": "Author updated successfully"}), 200    

@bp.route("/<authorid>/delete", methods=["DELETE"])
@jwt_required
def delete_author(authorid):
    author = AuthorService.get_author(authorid=authorid)
    if not author:
        return jsonify({"message": "Author not found"}), 404

    try:
        AuthorService.delete_author(authorid=authorid)
    except Exception as e:
        return jsonify({"message": "error cannot delete author"}), 500

    return jsonify({"message": "Author deleted successfully"}), 200
