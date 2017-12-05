--Table with member information
CREATE TABLE members(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) default '',
  dob DATE default NULL,
  dod DATE default NULL
);

-- Table to model tree
CREATE TABLE familyTree(
  childID int NOT NULL,
  parentID int NOT NULL,
  PRIMARY KEY (childID, parentID)
);

--YYYYMMDD
INSERT INTO members VALUES (1, 'Richard Shakespeare' 14900101, 15610210);
INSERT INTO members VALUES (2, 'John Shakespeare', 15310101, 16010907);
INSERT INTO members VALUES (3, 'Joan Shakespeare', 15580915, NULL);
INSERT INTO members VALUES (4, 'Margaret Shakespeare', 15621202, 15630430);
INSERT INTO members VALUES (5, 'William Shakespeare', 15640426, 16160423);
INSERT INTO members VALUES (6, 'Gilbert Shakespeare', 15661013, 16120203);
INSERT INTO members VALUES (7, 'Joan Shakespeare', 15690415, 16461104);
INSERT INTO members VALUES (8, 'Anne Shakespeare', 15710101, 15790404);
INSERT INTO members VALUES (9, 'Richard Shakespeare', 15740101, 16130101);
INSERT INTO members VALUES (10, 'Edmond Shakespeare', 15800101, 16071231);
INSERT INTO members VALUES (11, 'Susana Shakespeare', 15830526, 16490711);
INSERT INTO members VALUES (12, 'Hamnet Shakespeare', 15850101, 15960811);
INSERT INTO members VALUES (13, 'Judith Shakespeare', 15850202, 16620209);
INSERT INTO members VALUES (14, 'William Hart', 16000101, 16390101);
INSERT INTO members VALUES (15, 'Mary Hart', 16030101, 16070101);
INSERT INTO members VALUES (16, 'Thomas Hart', 16050101, 16700101);
INSERT INTO members VALUES (17, 'Michael Hart', 16080101, 16180101);
INSERT INTO members VALUES (18, 'Elizabeth Hall', 16080221, 16700217);
INSERT INTO members VALUES (19, 'Shakespeare Quiney', 16160101, 16170101);
INSERT INTO members VALUES (20, 'Richard Quiney', 16180101, 16390101);
INSERT INTO members VALUES (21, 'Thomas Quiney', 16200101, 16390101);
INSERT INTO members VALUES (22, 'John Bernard', NULL, 16740101);
--INSERT INTO members VALUES (2, 'Henry Shakespeare', NULL, 1569);


INSERT INTO familyTree VALUES
(2, 1), (3, 2), (4, 2), (5, 2), (6, 2), (7, 2), (8, 2),
(9, 2), (10, 2), (11, 5), (12, 5), (13, 5), (14, 7), (15, 7),
(16, 7), (17, 7), (18, 11), (19, 13), (20, 13), (21, 13), (22, 18);
