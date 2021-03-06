--Table with member information
CREATE TABLE members(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) default '',
  dob DATE default NULL,
  dod DATE default NULL
  parentID INT default 0;
);



--YYYYMMDD
INSERT INTO members VALUES (1, 'Richard Shakespeare', 14900101, 15610210, 0);
INSERT INTO members VALUES (2, 'John Shakespeare', 15310101, 16010907, 1);
INSERT INTO members VALUES (3, 'Joan Shakespeare', 15580915, NULL, 2);
INSERT INTO members VALUES (4, 'Margaret Shakespeare', 15621202, 15630430, 2);
INSERT INTO members VALUES (5, 'William Shakespeare', 15640426, 16160423, 2);
INSERT INTO members VALUES (6, 'Gilbert Shakespeare', 15661013, 16120203, 2);
INSERT INTO members VALUES (7, 'Joan Shakespeare', 15690415, 16461104, 2);
INSERT INTO members VALUES (8, 'Anne Shakespeare', 15710101, 15790404, 2);
INSERT INTO members VALUES (9, 'Richard Shakespeare', 15740101, 16130101, 2);
INSERT INTO members VALUES (10, 'Edmond Shakespeare', 15800101, 16071231, 2);
INSERT INTO members VALUES (11, 'Susana Shakespeare', 15830526, 16490711, 5);
INSERT INTO members VALUES (12, 'Hamnet Shakespeare', 15850101, 15960811, 5);
INSERT INTO members VALUES (13, 'Judith Shakespeare', 15850202, 16620209, 5);
INSERT INTO members VALUES (14, 'William Hart', 16000101, 16390101, 7);
INSERT INTO members VALUES (15, 'Mary Hart', 16030101, 16070101, 7);
INSERT INTO members VALUES (16, 'Thomas Hart', 16050101, 16700101, 7);
INSERT INTO members VALUES (17, 'Michael Hart', 16080101, 16180101, 7);
INSERT INTO members VALUES (18, 'Elizabeth Hall', 16080221, 16700217, 11);
INSERT INTO members VALUES (19, 'Shakespeare Quiney', 16160101, 16170101, 13);
INSERT INTO members VALUES (20, 'Richard Quiney', 16180101, 16390101, 13);
INSERT INTO members VALUES (21, 'Thomas Quiney', 16200101, 16390101, 13);
INSERT INTO members VALUES (22, 'John Bernard', NULL, 16740101, 18);
--INSERT INTO members VALUES (2, 'Henry Shakespeare', NULL, 1569);

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	loginID varchar(255) NOT NULL,
	password varchar(255) NOT NULL
);

ALTER TABLE members
ADD userID INT NOT NULL;

-- I created users:

-- long string is hashed password for "Databaseisgr8!"
INSERT INTO users (loginID, password) VALUES ('Trevor', '$2y$10$Zd.I6RP9p/sXH/jkOwl.f.ItAwQ5L6nKuLBeVUY..I1SiE4wUyDhG');


