import pandas as pd
import psycopg2
from psycopg2 import sql
from datetime import datetime

# Read CSV file
df = pd.read_csv("Book_Details.csv")

# Database connection
conn = psycopg2.connect(
    dbname="Rotten Potatoes",
    user="postgres",
    password="13591",
    host="localhost",
    port="5432",
)
cur = conn.cursor()


def parse_date(date_str):
    date_parts = date_str.split()
    year = date_parts[-1]
    if len(year) < 4:
        year = year.zfill(4)
    normalized_date_str = f"{date_parts[0]} {date_parts[1]} {year}"
    return datetime.strptime(normalized_date_str, "%B %d, %Y")


# Function to insert book and related data
def insert_book_data(row):
    date_str = row["publication_info"]
    date_part = (
        date_str.replace("First published ", "").replace("Published ", "").strip("[]'")
    )
    try:
        date_obj = parse_date(date_part).date()  # Convert to date object
    except ValueError as e:
        date_obj = None  # Handle the specific error
        print(f"Error parsing date: {e}")
    except Exception as e:  # Catch any other unexpected exceptions
        date_obj = None
        print(f"Unexpected error: {e}")

    try:
        num_pages = row["num_pages"].strip("[]'")
        if num_pages == "None" or num_pages == "":
            num_pages = None
    except Exception as e:  # Catch any unexpected exceptions
        num_pages = None
        print(f"Unexpected error (pages): {e}")

    try:
        format = row["format"].strip("[]'").split(", ")[-1]
    except ValueError as e:
        format = None  # Handle the specific error
        print(f"Error parsing format: {e}")
    except Exception as e:  # Catch any other unexpected exceptions
        format = None
        print(f"Unexpected error (format): {e}")
    # Insert book data
    insert_book_query = """
    INSERT INTO Books (cover, title, description, format, pub_date, page_numbers, goodreads_rating)
    VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING bookid;
    """
    cur.execute(
        insert_book_query,
        (
            row["cover_image_uri"],
            row["book_title"],
            row["book_details"],
            format,
            date_obj,
            num_pages,
            row["average_rating"],
        ),
    )
    book_id = cur.fetchone()[0]

    # Insert author data
    author_name = row["author"]
    cur.execute("SELECT authorid FROM Authors WHERE name = %s", (author_name,))
    author = cur.fetchone()
    if author is None:
        cur.execute(
            "INSERT INTO Authors (name) VALUES (%s) RETURNING authorid;",
            (author_name,),
        )
        author_id = cur.fetchone()[0]
    else:
        author_id = author[0]
    cur.execute(
        "INSERT INTO BookAuthors (bookID, authorID) VALUES (%s, %s);",
        (book_id, author_id),
    )

    # Insert genre data
    genres = eval(row["genres"])  # Convert string representation of list to actual list
    for genre in genres:
        cur.execute("SELECT genreID FROM Genres WHERE name = %s", (genre,))
        genre_record = cur.fetchone()
        if genre_record is None:
            cur.execute(
                "INSERT INTO Genres (name) VALUES (%s) RETURNING genreid;", (genre,)
            )
            genre_id = cur.fetchone()[0]
        else:
            genre_id = genre_record[0]
        cur.execute(
            "INSERT INTO BookGenres (bookID, genreID) VALUES (%s, %s);",
            (book_id, genre_id),
        )


# Iterate over each row in the dataframe and insert data
for index, row in df.iterrows():
    insert_book_data(row)

# Commit changes and close connection
conn.commit()
cur.close()
conn.close()
