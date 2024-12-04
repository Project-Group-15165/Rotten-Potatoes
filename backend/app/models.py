from dataclasses import dataclass, field
from datetime import datetime, date


@dataclass
class User:
    username: str
    name: str
    middle_name: str
    last_name: str
    email: str
    birthdate: datetime
    gender: str
    avatar: int
    password: str
    userid: int = 0
    joined_on: datetime = field(default_factory=datetime.now)
    last_logged_in: datetime = field(default_factory=datetime.now)


@dataclass
class Book:
    title: str
    cover: str
    description: str
    format: str
    page_numbers: int
    pub_date: datetime
    goodreads_rating: float
    bookid: int = 0


@dataclass
class Author:
    name: str
    wiki_link: str
    image: str
    summary: str
    description: str
    authorid: int = 0


@dataclass
class Genre:
    genreid: int
    name: str


@dataclass
class Comment:
    userid: int
    bookid: int
    content: str
    spoiler: bool
    commentid: int = 0
    creation_date: datetime = field(default_factory=datetime.now)


@dataclass
class Review:
    userid: int
    bookid: int
    review: str
    rating: int
    reviewid: int = 0
    creation_date: datetime = field(default_factory=datetime.now)


@dataclass
class Progress:
    userid: int
    bookid: int
    reading_status: str
    pages_read: int
    started_reading: datetime
    finished_reading: datetime


@dataclass
class List:
    listid: int
    listname: str
    creationdate: datetime = field(default_factory=datetime.now)

@dataclass
class ListItem:
    bookid: int
    listid: int
    addedon: datetime = field(default_factory=datetime.now)


@dataclass
class userBook:
    userid: int
    title: str
    cover: str
    description: str
    format: str
    page_numbers: int
    pub_date: datetime
    bookid: int = 0
