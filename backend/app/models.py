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
    pass


@dataclass
class Author:
    pass


@dataclass
class Genre:
    pass


@dataclass
class Comment:
    pass


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
    pass


@dataclass
class CustomList:
    pass


@dataclass
class WantToRead:
    pass


@dataclass
class AlreadyRead:
    pass


@dataclass
class CurrentlyReading:
    pass
