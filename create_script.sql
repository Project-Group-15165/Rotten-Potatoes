CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,           
    username VARCHAR(20) NOT NULL,       
    name VARCHAR(20) NOT NULL,           
    middle_name VARCHAR(20),             
    last_name VARCHAR(20) NOT NULL,      
    email VARCHAR(50) NOT NULL UNIQUE,  
    birthdate DATE NOT NULL,
    gender CHAR(1) NOT NULL,
    avatar SMALLINT,
    password VARCHAR(20) NOT NULL,       
    joined_on TIMESTAMP NOT NULL,        
    last_logged_in TIMESTAMP NOT NULL
);



CREATE TABLE Progress(
    userID INT,
    bookID INT,
    reading_status VARCHAR(20),
    pages_read INT DEFAULT 0,
    started_reading DATE,
    finished_reading DATE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    PRIMARY KEY (userID, bookID)
);

CREATE TABLE Reviews(
    reviewID SERIAL PRIMARY KEY,
    userID INT,
    bookID INT,
    FOREIGN KEY (userID)
        REFERENCES Users (userID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (bookID)
        REFERENCES Books (bookID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    review TEXT ,
    rating SMALLINT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WantToRead (
    userID INT,
    bookID INT, 
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    PRIMARY KEY (userID, bookID)
);

CREATE TABLE CurrentlyReading (
    userID INT,
    bookID INT, 
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    PRIMARY KEY (userID, bookID)
);

CREATE TABLE AlreadyRead (
    userID INT,
    bookID INT, 
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    PRIMARY KEY (userID, bookID) 
);

CREATE TABLE CustomList (
    userID INT,
    bookID INT, 
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    list_name TEXT NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    PRIMARY KEY (userID, bookID) 
);

CREATE TABLE Books (
    bookID SERIAL PRIMARY KEY,         
    title TEXT NOT NULL,               
    cover TEXT,                     
    description TEXT,                  
    format TEXT,                       
    page_numbers INTEGER,              
    pub_date DATE,                     
    goodreads_rating REAL            
);


CREATE TABLE Comments(
    commentID SERIAL PRIMARY KEY,
    userID INT,
    bookID INT,
    FOREIGN KEY (userID)
        REFERENCES Users (userID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (bookID)
        REFERENCES Books (bookID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    content TEXT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    spoiler BOOLEAN DEFAULT FALSE
);

CREATE TABLE Genres(
    genreID SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE BookAuthors (
    bookID INT, 
    authorID INT,   
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    FOREIGN KEY (authorID) REFERENCES Authors(authorID) ON DELETE CASCADE,
    PRIMARY KEY (bookID, authorID)
);

CREATE TABLE BookGenres (
    bookID INT, 
    genreID INT,   
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    FOREIGN KEY (genreID) REFERENCES Genres(genreID) ON DELETE CASCADE,
    PRIMARY KEY (bookID, genreID)
);

CREATE TABLE Authors (
    authorID SERIAL PRIMARY KEY,      
    name VARCHAR(100) NOT NULL,        
    wiki_link TEXT,                      
    image TEXT,                    
    summary TEXT,
    description TEXT                 
);

CREATE TABLE userBooks (
    bookID SERIAL PRIMARY KEY, 
    userID INT,       
    title TEXT NOT NULL,               
    cover TEXT,                     
    description TEXT,                  
    format TEXT,                       
    page_numbers INTEGER NOT NULL,              
    pub_date DATE,     
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,                          
);