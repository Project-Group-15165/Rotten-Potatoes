from flask import Flask

# from app.routes import register_blueprints
from app.utils.auth import bp
from app.routes.review_routes import bp as bp1
from app.routes.user_routes import bp as bp2


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    # Register blueprints
    # register_blueprints(app)
    app.register_blueprint(bp, url_prefix="/auth")
    app.register_blueprint(bp1, url_prefix="/review")
    app.register_blueprint(bp2, url_prefix="")
    return app
