from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import jwt_required
from app.models import Review
from app.services import ReviewService

bp = Blueprint("review", __name__)


@bp.route("/bookid/<bookid>", methods=["GET"])
def book_reviews(bookid):
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    try:
        reviews, total_count, page_count = ReviewService.get_all_reviews_of_book(
            bookid=bookid, per_page=per_page, page_number=page
        )
        print(reviews)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if reviews:
        return jsonify(reviews, total_count, page_count), 201
    else:
        return jsonify({"message": "no reviews"}), 404


@bp.route("/userid/<userid>", methods=["GET"])
def user_reviews(userid):
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    try:
        reviews = ReviewService.get_all_reviews_of_user(
            userid=userid, per_page=per_page, page_number=page
        )
    except Exception as e:
        return jsonify({"message": "error can't get reviews" + str(e)}), 500

    if reviews:
        return jsonify(reviews), 201
    else:
        return jsonify({"message": "no reviews"}), 404


@bp.route("/<bookid>/add", methods=["POST"])
@jwt_required
def new_review(identity, bookid):
    data = request.get_json()
    rating = data.get("rating")
    review = data.get("review")
    review = Review(
        userid=identity["userid"],
        bookid=bookid,
        rating=rating,
        review=review,
    )
    try:
        ReviewService.add_review(review=review)
    except Exception as e:
        return jsonify({"message": "error can't add review" + str(e)}), 500

    return jsonify({"message": "success"}), 201


@bp.route("/<bookid>/update", methods=["PUT"])
@jwt_required
def update_review(identity, bookid):
    userid = identity["userid"]
    review = ReviewService.get_review(userid=userid, bookid=bookid)
    data = request.get_json()
    review.rating = data.get("rating")
    review.review = data.get("review")
    try:
        ReviewService.update_review(review=review)
    except Exception as e:
        return jsonify({"message": "error can't update review" + str(e)}), 500

    return jsonify({"message": "success"}), 200


@bp.route("/<bookid>/delete", methods=["DELETE"])
@jwt_required
def delete_review(identity, bookid):
    userid = identity["userid"]
    review = ReviewService.get_review(userid=userid, bookid=bookid)
    if not review:
        return jsonify({"message": "no review to delete"}), 404
    try:
        ReviewService.delete_review(userid=userid, bookid=bookid)
    except Exception as e:
        return jsonify({"message": "error can't delete review" + str(e)}), 500

    return jsonify({"message": "success"}), 200
