from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Author
from app.services import AuthorService

bp = Blueprint("author", __name__)


@bp.route("/getbyid/<authorid>", methods=["GET"])
def get_author(authorid):
    try:
        author = AuthorService.get_author(authorid=authorid)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if author:
        return jsonify(author), 200
    else:
        return jsonify({"message": "Author not found"}), 404


@bp.route("/add", methods=["POST"])
@jwt_required
def add_author(identity):
    data = request.get_json()
    try:
        AuthorService.add_author(data)
    except Exception as e:
        return jsonify({"message": "error can't add author " + str(e)}), 500

    return jsonify({"message": "Author added successfully"}), 201


@bp.route("/update/<authorid>", methods=["PUT"])
@jwt_required
def update_author(identity, authorid):
    data = request.get_json()
    print(data)
    try:
        AuthorService.update_author(data)
    except Exception as e:
        return jsonify({"message": "error can't update author " + str(e)}), 500

    return jsonify({"message": "Author updated successfully"}), 200


@bp.route("/delete/<authorid>", methods=["DELETE"])
@jwt_required
def delete_author(identity, authorid):
    author = AuthorService.get_author(authorid)
    if not author:
        return jsonify({"message": "Author not found"}), 404
    try:
        AuthorService.delete_author(authorid=authorid)
    except Exception as e:
        return jsonify({"message": "error cannot delete author"}), 500

    return jsonify({"message": "Author deleted successfully"}), 200


@bp.route("/get/<authorid>", methods=["GET"])
def get_authorcard(authorid):
    try:
        author = AuthorService.get_authorCard(authorid=authorid)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if author:
        return jsonify(author), 200
    else:
        return jsonify({"message": "Author not found"}), 404


@bp.route("/getallauthors", methods=["GET"])
def all_authors():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    input_word = request.args.get("input_word", "", type=str).lower()
    try:
        Authorids = AuthorService.get_all_authors(
            page_number=page, per_page=per_page, input_word=input_word
        )
    except Exception as e:
        return jsonify({"message": "error can't get authors" + str(e)}), 500

    if Authorids:
        return jsonify(Authorids), 201
    else:
        return jsonify({"message": "no authors"}), 404


@bp.route("/authorid/<authorid>", methods=["GET"])
def book_by_authorid(authorid):  # author + 4books -> => changed to author+ all books
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 4, type=int)
    try:
        author_info = AuthorService.get_author(authorid=authorid)

        books = AuthorService.get_all_books_of_author(
            authorid=authorid, per_page=per_page, page_number=page
        )
        if not books:
            return jsonify({"message": "no books"}), 404

        response = {"author": author_info, "books": books}
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

@bp.route("/getauthornameid", methods=["GET"])
def getauthornameid():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    input_word = request.args.get("input_word", "", type=str).lower()
    try:
        Authorids = AuthorService.get_id_name_author(
            page_number=page, per_page=per_page, input_word=input_word
        )
    except Exception as e:
        return jsonify({"message": "error can't get authors" + str(e)}), 500

    if Authorids:
        return jsonify(Authorids), 201
    else:
        return jsonify({"message": "no authors"}), 404
