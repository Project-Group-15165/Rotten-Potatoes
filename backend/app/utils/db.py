import psycopg2
from flask import current_app, g


def get_db_connection():
    g.db_conn = psycopg2.connect(
        dbname=current_app.config["DB_NAME"],
        user=current_app.config["DB_USER"],
        password=current_app.config["DB_PASSWORD"],
        host=current_app.config["DB_HOST"],
    )
    return g.db_conn

