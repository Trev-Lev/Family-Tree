# Family-Tree

A family tree, by Trevor Levins and Erik Bowers

This webservice allows a predefined set of users to log in and create, edit, and remove nodes from a family tree. This type of family tree allows for a family name to be tracked through generations, and as such does not support tracking multiple family lines (2 parents per node in the tree.)

A working version of the tree can be found at [erikbowers.epizy.com/familyTree](http://erikbowers.epizy.com/familyTree)

**An account exists on this database with a full tree already created with the username "erik" and password "letmein".**

**Or, begin with an empty tree with the username "username" and password "password".**

The three buttons to edit the tree are found at the bottom of the page - Add, remove, and edit. Add implements the "create" part of CRUD, remove implements the "delete" part of CRUD, and edit implements the "update" part of CRUD. The "read" part of CRUD is satisfied whenever a page is reloaded or whenever a user is logged in to the system.

Entity Relationship Diagram (sorry about the disgusting watermark, the software linked in the requirements adds that automatically)

![ERD](https://github.com/Trev-Lev/Family-Tree/blob/master/dev2/ERD.png "ERD Diagram")

Database schema:

    CREATE TABLE members(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(255) default '',
    dob DATE default NULL,
    dod DATE default NULL,
    parentID INT default 0,
    userID INT NOT NULL
    );

    CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    loginID VARCHAR(255),
    password VARCHAR(255) 
    );
    

Video demonstration:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=Yp-Q-3MHyY0
" target="_blank"><img src="http://img.youtube.com/vi/Yp-Q-3MHyY0/0.jpg" 
alt="video" width="240" height="180" border="10" /></a>

