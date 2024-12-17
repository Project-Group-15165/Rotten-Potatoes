from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Author
from app.services import AuthorService

bp = Blueprint("author", __name__)

@bp.route("/<authorid>", methods=["GET"])
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
    author = Author(
        name=data.get("name"),
        wiki_link=data.get("wiki_link"),
        image=data.get("image"),
        description=data.get("description"),
        summary=data.get("summary"),
    )
    try:
        AuthorService.add_author(author=author)
    except Exception as e:
        return jsonify({"message": "error can't add author " + str(e)}), 500

    return jsonify({"message": "Author added successfully"}), 201


@bp.route("/<authorid>/update", methods=["PUT"])
@jwt_required
def update_author(identity, authorid):
    author = AuthorService.get_author(authorid)
    data = request.get_json()
    if not author:
        return jsonify({"message": "Author not found"}), 404

    if data.get("name"):
        author.name = data.get("name")
    if data.get("wiki_link"):
        author.wiki_link = data.get("wiki_link")
    if data.get("image"):
        author.image = data.get("image")
    if data.get("description"):
        author.description = data.get("description")
    if data.get("summary"):
        author.summary = data.get("summary")

    # author.name = data.get("name")
    # author.wiki_link = data.get("wiki_link")
    # author.image = data.get("image")
    # author.description = data.get("description")
    # author.summary = data.get("summary")

    try:
        AuthorService.update_author(author=author)
    except Exception as e:
        return jsonify({"message": "error can't update author " + str(e)}), 500

    return jsonify({"message": "Author updated successfully"}), 200


@bp.route("/<authorid>/delete", methods=["DELETE"])
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
    try:
        Authorids = AuthorService.get_all_authors(page_number=page, per_page=per_page)
    except Exception as e:
        return jsonify({"message": "error can't get authors" + str(e)}), 500

    if Authorids:
        return jsonify(Authorids), 201
    else:
        return jsonify({"message": "no authors"}), 404
    
@bp.route("/authorid/<authorid>", methods=["GET"])
def book_by_authorid(authorid): # author + 4books
    try:
        author_info = AuthorService.get_author(authorid=authorid)
        if not author_info:
            return jsonify({"message": "Author not found"}), 404       
        
        books = AuthorService.get_four_books_of_author(authorid=authorid)
        if not books:
            return jsonify({"message": "no books"}), 404
        print(books)

        response = {
            "author": author_info,  
            "books": books          
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

        


