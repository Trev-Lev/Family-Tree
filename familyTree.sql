CREATE TABLE members(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  sex VARCHAR(6) NOT NULL,
  dob DATE,
  spouse VARCHAR(255) NOT NULL,
  spouseID INT(4) DEFAULT NULL,
  parentID INT(4) DEFAULT NULL
);

/*YYYYMMDD*/
INSERT INTO members (firstName, lastName, sex, dob, spouse, spouseID, parentID)
VALUES ('Billy Bob', 'Clyde', 'm', '19051217', 'Janet', '2', '0');
INSERT INTO members (firstName, lastName, sex, dob, spouse, spouseID, parentID)
VALUES ('Janet', 'Mango', 'f', '19050521', 'Billy Bob', '1', '0');

INSERT INTO members (firstName, lastName, sex, dob, spouse, spouseID, parentID)
VALUES ('Billy Bob Jr.', 'Clyde', 'm', '19351105', 'Bella', '4', '1');
INSERT INTO members (firstName, lastName, sex, dob, spouse, spouseID, parentID)
VALUES ('Bella', 'Margo', 'f', '19340714', 'Billy Bob Jr.', '3', '0');
INSERT INTO members (firstName, lastName, sex, dob, spouse, spouseID, parentID)
VALUES ('Katherine', 'Clyde', 'f', '19370125', 'Frederick', '6', '1');
INSERT INTO members (firstName, lastName, sex, dob, spouse, spouseID, parentID)
VALUES ('Frederick', 'Corrick', 'm', '19400809', 'Katherine', '5', '0');
