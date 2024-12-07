from flask import Flask

# from app.routes import register_blueprints
from app.utils.auth import bp
from app.routes.review_routes import bp as bp1
from app.routes.user_routes import bp as bp2
from app.routes.author_routes import bp as bp3
from app.routes.book_routes import bp as bp4
from app.routes.comment_routes import bp as bp5
from app.routes.progress_routes import bp as bp6
from app.routes.list_routes import bp as bp7


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    # Register blueprints
    # register_blueprints(app)
    app.register_blueprint(bp, url_prefix="/auth")
    app.register_blueprint(bp1, url_prefix="/review")
    app.register_blueprint(bp2, url_prefix="/user")
    app.register_blueprint(bp3, url_prefix="/author")
    app.register_blueprint(bp4, url_prefix="/book")
    app.register_blueprint(bp5, url_prefix="/comment")
    app.register_blueprint(bp6, url_prefix="/progress")
    app.register_blueprint(bp7, url_prefix="/list")
    return app
