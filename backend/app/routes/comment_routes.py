from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Comment
from app.services import CommentService

bp = Blueprint("comment", __name__)
    
@bp.route("/<bookid>/add", methods=["POST"])
@jwt_required
def new_comments(identity, bookid):
    data = request.get_json()
    
    content = data.get("content")
    spoiler = data.get("spoiler")
    # it think when we fill it is gonna be yes or not so i change it to true or false
    if (spoiler.lower() == "yes"): # we can make thg+is as list of yes and no to the user
        spoiler = True
    else: 
        spoiler = False
    comment = Comment(
        userid=identity["userid"], bookid=bookid, content=content, spoiler=spoiler,
    )
    try:
        CommentService.add_comment(comment=comment)
    except Exception as e:
        return jsonify({"message": "error can't add comment " + str(e)}), 500

    return jsonify({"message": "success"}), 201

@bp.route("/<bookid>/update", methods=["PUT"]) #should i add the comment id here
@jwt_required
def update_comment(identity, bookid):
    userid=identity["userid"]
    comment = CommentService.get_comment(userid=userid, bookid=bookid)
    data = request.get_json()
    comment.content = data.get("content")
    comment.soiler = data.get("spoiler") # How to update time !
    
    try:
        CommentService.update_comment(comment=comment)
    except Exception as e:
        return jsonify({"message": "error can't update comment " + str(e)}), 500

    return jsonify({"message": "success"}), 200


@bp.route("/<bookid>/delete", methods=["DELETE"])
@jwt_required
def delete_comment(identity, bookid):
    userid = identity["userid"]
    comment = CommentService.get_comment(userid=userid, bookid=bookid)
    if not comment:
        return jsonify({"message": "no comment to delete"}), 404
    try:
        CommentService.delete_comment(comment.commentid)
    except Exception as e:
        return jsonify({"message": "error can't delete comment " + str(e)}), 500

    return jsonify({"message": "success"}), 200

@bp.route("/bookid/<bookid>/getallcomments", methods=["GET"])
def book_comments(bookid):
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    try:
        reviews = CommentService.get_all_comments_of_book(bookid=bookid,per_page=per_page, page_number=page)
    except Exception as e:
        return jsonify({"message": "error can't get comments" + str(e)}), 500

    if reviews:
        return jsonify(reviews), 201
    else:
        return jsonify({"message": "no comments"}), 404
    
@bp.route("/userid/<userid>/getallcomments", methods=["GET"])
def user_comments(userid):
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    try:
        comments = CommentService.get_all_comments_of_user(userid=userid, page=page,per_page=per_page )
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if comments:
        return jsonify(comments), 201
    else:
        return jsonify({"message": "no comments"}), 404
    
    
@bp.route("/get/<commentid>", methods=["GET"])
def getcomment_by_id(commentid):
    try:
        book = CommentService.get_comment(commentid)
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    if book:
        return jsonify(book), 201
    else:
        return jsonify({"message": "no such comment"}), 404
    
