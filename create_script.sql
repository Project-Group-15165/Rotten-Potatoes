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