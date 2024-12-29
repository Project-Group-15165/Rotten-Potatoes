from flask import Blueprint, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
from app.utils.db import get_db_connection
from math import ceil

bp = Blueprint("advancedsearch", __name__)

ordered_genres_query = """,
                    OrderedGenres AS (
                        SELECT 
                            T2.bookID, 
                            ARRAY_AGG(T3.genreid ORDER BY T3.genreid ASC) AS genreids
                        FROM bookgenres AS T2
                        JOIN genres AS T3 ON T2.genreid = T3.genreid
                        GROUP BY T2.bookID
                    )"""
genres_join = "JOIN OrderedGenres AS G ON T1.bookID = G.bookID"


def advanced_search(filters, page_number, per_page):
    offset = (page_number - 1) * per_page
    conn = get_db_connection()
    if conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            count_query = """
                WITH OrderedAuthors AS (
                    SELECT 
                        T4.bookID, 
                        ARRAY_AGG(T5.authorid ORDER BY T5.authorid ASC) AS authorids,
                        ARRAY_AGG(T5.name ORDER BY T5.authorid ASC) AS authors
                    FROM bookauthors AS T4
                    JOIN authors AS T5 ON T4.authorid = T5.authorid
                    GROUP BY T4.bookID
                )
                %s
                SELECT COUNT(*) FROM books AS T1
                JOIN OrderedAuthors AS A ON T1.bookID = A.bookID
                %s
                WHERE LOWER(T1.title) LIKE %s
                %s
            """

            query = """
                WITH OrderedAuthors AS (
                    SELECT 
                        T4.bookID, 
                        ARRAY_AGG(T5.authorid ORDER BY T5.authorid ASC) AS authorids,
                        ARRAY_AGG(T5.name ORDER BY T5.authorid ASC) AS authors
                    FROM bookauthors AS T4
                    JOIN authors AS T5 ON T4.authorid = T5.authorid
                    GROUP BY T4.bookID
                )
                %s
                SELECT 
                    T1.bookid,
                    T1.title,  
                    T1.format, 
                    T1.goodreads_rating, 
                    T1.cover,
                    A.authors, 
                    T1.page_numbers, 
                    EXTRACT(YEAR FROM T1.pub_date) as pub_date
                FROM books AS T1
                JOIN OrderedAuthors AS A ON T1.bookID = A.bookID
                %s
                WHERE LOWER(T1.title) LIKE %s
                %s
                %s
                LIMIT %s OFFSET %s
            """

            # Initialize the extra where clause and joins
            extra_where = ""
            joins = ""
            order_by = ""

            # Add genres filter if provided
            if "selectedGenres" in filters and filters["selectedGenres"]:
                genre_ids = [genre["value"] for genre in filters["selectedGenres"]]
                extra_where += (
                    f"AND G.genreids && ARRAY[{','.join(map(str, genre_ids))}] "
                )
                joins += genres_join

            # Add authors filter if provided
            if "selectedAuthors" in filters and filters["selectedAuthors"]:
                author_ids = [author["value"] for author in filters["selectedAuthors"]]
                extra_where += (
                    f"AND A.authorids && ARRAY[{','.join(map(str, author_ids))}] "
                )

            # Add page numbers filter if provided
            if "selectedPageNumbers" in filters and filters["selectedPageNumbers"]:
                page_ranges = {
                    1: "T1.page_numbers < 150",
                    2: "T1.page_numbers BETWEEN 150 AND 300",
                    3: "T1.page_numbers BETWEEN 300 AND 500",
                    4: "T1.page_numbers BETWEEN 500 AND 700",
                    5: "T1.page_numbers BETWEEN 700 AND 900",
                    6: "T1.page_numbers > 900",
                }
                page_conditions = [
                    page_ranges[page["value"]]
                    for page in filters["selectedPageNumbers"]
                ]
                extra_where += f"AND ({' OR '.join(page_conditions)}) "

            # Add rating filter if provided
            if "selectedMinRating" in filters and filters["selectedMinRating"]:
                extra_where += f"AND T1.goodreads_rating >= {filters['selectedMinRating']['value']} "
            if "selectedMaxRating" in filters and filters["selectedMaxRating"]:
                extra_where += f"AND T1.goodreads_rating <= {filters['selectedMaxRating']['value']} "

            # Add year filter if provided
            if "selectedStartYear" in filters and filters["selectedStartYear"]:
                extra_where += f"AND EXTRACT(YEAR FROM T1.pub_date) >= {filters['selectedStartYear']['value']} "
            if "selectedEndYear" in filters and filters["selectedEndYear"]:
                extra_where += f"AND EXTRACT(YEAR FROM T1.pub_date) <= {filters['selectedEndYear']['value']} "

            # Add order by clause if provided
            if "orderBy" in filters and filters["orderBy"]:
                order_options = {
                    1: "ORDER BY T1.title ASC",
                    2: "ORDER BY A.authors ASC",
                    3: "ORDER BY G.genreids ASC",
                    4: "ORDER BY T1.format ASC",
                    5: "ORDER BY T1.goodreads_rating DESC",
                    6: "ORDER BY T1.pub_date DESC",
                    7: "ORDER BY T1.page_numbers ASC",
                }
                order_by = order_options[filters["orderBy"]["value"]]

            # Format the count query with the dynamic parts
            count_query = count_query % (
                (
                    ordered_genres_query
                    if "selectedGenres" in filters and filters["selectedGenres"]
                    else ""
                ),
                joins,
                ("'" + "%" + filters["input"] + "%" + "'"),
                extra_where,
            )

            # Format the main query with the dynamic parts
            query = query % (
                (
                    ordered_genres_query
                    if "selectedGenres" in filters and filters["selectedGenres"]
                    else ""
                ),
                joins,
                ("'" + "%" + filters["input"] + "%" + "'"),
                extra_where,
                order_by,
                per_page,
                offset,
            )

            try:
                # Execute the count query to get the total number of results
                cur.execute(count_query)
                result = cur.fetchone()
                total_count = result["count"] if result else 0

                # Calculate the total number of pages
                page_count = ceil(total_count / per_page)

                # Execute the main query to get the paginated results
                cur.execute(query)
                results = cur.fetchall()
                return results, page_count
            except Exception as e:
                raise e
            finally:
                cur.close()
                conn.close()


@bp.route("/advancedsearch", methods=["POST"])
def get_review():
    data = request.get_json()
    page_number = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))

    try:
        results, page_count = advanced_search(data, page_number, per_page)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if results:
        return jsonify({"results": results, "page_count": page_count}), 200
    else:
        return jsonify({"message": "no results"}), 404
