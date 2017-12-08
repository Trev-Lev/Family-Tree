
/*
    MODALS LOOKS WEIRD! MAYBE RESIZE THEM? I DONT KNOW
*/


/*
var simple_chart_config = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "tree.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
*/


//var simple_chart_config = [];
 var simple_chart_config = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "tree1.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
/*
      simple_chart_config.nodeStructure = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "tree3.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })();
*/
        //console.log(simple_chart_config.nodeStructure);

        var sqlquery = (function() {
              var json = null;
              $.ajax({
                  'async': false,
                  'global': false,
                  'url': "readFile.php",
                  'dataType': "json",
                  'success': function (data) {
                      json = data;
                  }
              });
              return json;
          })();
console.log(sqlquery);

unflatten = function( array, parent, tree ){

    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: 0 };

    var children = _.filter( array, function(child){ return child.parentid == parent.id; });

    if( !_.isEmpty( children )  ){
        if( parent.id == 0 ){
           tree = children;
        }else{
           parent['children'] = children;
        }
        _.each( children, function( child ){ unflatten( array, child ) } );
    }

    return tree;
}



//var sortedquery = _queryTreeSort(sqlquery);
//console.log(sortedquery);

var sortedquery = unflatten(sqlquery);
//simple_chart_config.nodeStructure = unflatten(sqlquery);

//console.dir(sortedquery);

//var string = sortedquery.toString();
//var newString = string.substring(1, string.length-1);
//console.log(string);
//var array = JSON.parse(newString);
//simple_chart_config.nodeStructure = newString
simple_chart_config.nodeStructure = sortedquery[0];
//console.log(newString);
//simple_chart_config.nodeStructure = _makeTree(sortedquery);

//The data below is now in a separate file as called above

/*
var simple_chart_config = {
    chart: {
        container: "#tree-simple",
        scrollbar: "fancy",
        connectors: {
            type: "step"    // Probably the best connector for a family tree structure
        },
        node: {
            collapsable: true,
        },
        animation: {
                nodeAnimation: "easeOutQuad", // easeOutBounce
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
        }
    }
  };
simple_chart_config.nodeStructure = {
  //  nodeStructure: {
        text: { name: "Parent node",
                title: "February 25th, 1997"
              },
        HTMLclass: "blue",
        // To test how the tree works with only one node (initial state), comment out like below:
        // /*
        children: [
            {
                text: { name: "First child",
                        title: "2017"
                      },
                HTMLclass: "white"
            },
            {
                text: { name: "Another child",
                        title: "1997-2015"
                      },
                HTMLclass: "white"
            },
            {
                text: { name: "Trevor",
                        title: "2011"
                      },
                HTMLclass: "white",
                children: [
                    {
                        text: { name: "John",
                                title: "2017"
                              },
                        HTMLclass: "blue"
                    },
                    {
                        text: { name: "Jay",
                                title: "2017"
                              },
                        HTMLclass: "blue"
                    }
                ]
            }
        ]
  //  }
};
*/

// Returns a list of the names of all the nodes, as all are eligible to be parents
// In the nested for loop, modify to check for end of name field if additional fields are added.
// The same applies for the getChildren() function.
// Though I think checking if the character is not a , or } tag fulfills this entirely
function getParents() {

    // Create list to return
    var quotedNames = [];

    // Begin the arduous task of getting nodes yay
    var result = JSON.stringify(simple_chart_config.nodeStructure);
    var list = result.split('"name":');

    // the first value is useless, as seen in the console
    list.shift();

    // Now, parse until '}' is found - "" gets ignored
    for (i = 0; i < list.length; i++) {
        var stringToAdd = "";
        for (j = 0; list[i][j] != '}' && list[i][j] != ","; j++) {
            if (list[i][j] != '"') stringToAdd += list[i][j];
        }
        quotedNames.push(stringToAdd);
    }
    return quotedNames; // Finished product
}

// Returns a list of IDs to be used for adding nodes to the tree
function getIDs() {
    var quotedIDs = [];
    var result = JSON.stringify(simple_chart_config.nodeStructure);
    //console.log(result);
    var list = result.split('"id":');
    list.shift();
    //console.log(list);

    // Now, parse until '}' is found - "" gets ignored
    for (i = 0; i < list.length; i++) {
        var stringToAdd = "";
        //console.log("hi");
        for (j = 0; list[i][j] != '}' && list[i][j] != ","; j++) {
            if (list[i][j] != '"') stringToAdd += list[i][j];
        }
        quotedIDs.push(stringToAdd);
    }
    //console.log(quotedIDs);
    return quotedIDs;
}

// Returns a list of names of all nodes that do NOT have children (leaf nodes)
function getChildren() {

    // Create a deep copy. This is necessary or else everything is modified.
    var deepcopy = jQuery.extend(true, {}, simple_chart_config.nodeStructure);

    // Create list to return
    var quotedNames = [];
    var currentNode = deepcopy;
    if (currentNode.children == null) {
        // If there is nothing to remove, return the empty set.
        // The function will alert the user that there are no nodes to remove.
        return quotedNames;
    }

    // If program reaches this point, the base level node has children and this is safe
    var stack = currentNode.children;

    // Simple depth-first-search in javascript.
    // I feel like a cool person for doing this
    while(stack.length > 0) {
        currentNode = stack.pop();
        if (currentNode.children != null) {
            stack.push(currentNode.children);
        } else {
            // If the current node has no children, add to the list
            quotedNames.push(currentNode);
        }
    }

    // Get a long string to parse
    var asString = JSON.stringify(quotedNames);

    // Split into an array of strings
    var list = asString.split('"name":');

    // Remove first element of array
    list.shift();

    // Final output array. Just the names.
    var leafNodes = [];

    // Now, parse until '}' is found - "" gets ignored
    for (i = 0; i < list.length; i++) {
        var stringToAdd = "";
        for (j = 0; list[i][j] != '}' && list[i][j] != ","; j++) {
            if (list[i][j] != '"') stringToAdd += list[i][j];
        }
        leafNodes.push(stringToAdd);
    }

    // Return only the leaf nodes of the tree.
    return leafNodes;
}

// Returns IDs for leaf nodes
function getLeafIDs() {

    // Create a deep copy. This is necessary or else everything is modified.
    var deepcopy = jQuery.extend(true, {}, simple_chart_config.nodeStructure);

    // Create list to return
    var quotedNames = [];
    var currentNode = deepcopy;
    if (currentNode.children == null) {
        // If there is nothing to remove, return the empty set.
        // The function will alert the user that there are no nodes to remove.
        return quotedNames;
    }

    // If program reaches this point, the base level node has children and this is safe
    var stack = currentNode.children;

    // Simple depth-first-search in javascript.
    // I feel like a cool person for doing this
    while(stack.length > 0) {
        currentNode = stack.pop();
        if (currentNode.children != null) {
            stack.push(currentNode.children);
        } else {
            // If the current node has no children, add to the list
            quotedNames.push(currentNode);
        }
    }

    // Get a long string to parse
    var asString = JSON.stringify(quotedNames);

    // Split into an array of strings
    var list = asString.split('"id":');

    // Remove first element of array
    list.shift();

    // Final output array. Just the names.
    var leafNodes = [];

    // Now, parse until '}' is found - "" gets ignored
    for (i = 0; i < list.length; i++) {
        var stringToAdd = "";
        for (j = 0; list[i][j] != '}' && list[i][j] != ","; j++) {
            if (list[i][j] != '"') stringToAdd += list[i][j];
        }
        leafNodes.push(stringToAdd);
    }

    // Return only the leaf nodes of the tree.
    return leafNodes;
}

// Creates the tree!
var tree = new Treant(simple_chart_config);

// Functions to change display of death input field.
// I know they can be one function but I am too lazy to do the mental work required for it
function checkboxChange(checkElement) {
    var deathinput = document.getElementById('editdeathdiv');
    if (checkElement.checked) {
        deathinput.style.display = 'block';
    } else {
        deathinput.style.display = 'none';
    }
}

function addCheckChange(checkElement) {
    var deathinput = document.getElementById('adddeathdiv');
    if (checkElement.checked) {
        deathinput.style.display = 'block';
    } else {
        deathinput.style.display = 'none';
    }
}

/* Modal for adding new nodes */
var addmodal = document.getElementById('addmodal');
var addbtn = document.getElementById("addbutton");
var addspan = document.getElementsByClassName("addclose")[0];
var addcontent = document.getElementById('modal-content-add');

/* Modal for removing existing nodes */
var removemodal = document.getElementById('removemodal');
var removebtn = document.getElementById('removebutton');
var removespan = document.getElementsByClassName('removeclose')[0];
var removecontent = document.getElementById('modal-content-remove');

/* Modal for editing existing nodes */
var editmodal = document.getElementById('editmodal');
var editbtn = document.getElementById('editbutton');
var editspan = document.getElementsByClassName('editclose')[0];
var editcontent = document.getElementById('modal-content-edit');

editbtn.onclick = function() {

    // make visible
    editmodal.style.display = "block";

    // Get list of all names of parents
    var nodes = getParents();
    var ids = getIDs();

    // <form action='editnode.php'>

    var contentHTML = "<div class='modal-edge-edit'> Edit a node </div> <span class='editclose'>&times;</span> <div id='addform'> <br> <form action='editnode.php' method='post'> Node to edit: <select id='nodes-edit-id' name='children'>";

    for (i = 0; i < nodes.length; i++) {
        contentHTML += "<option value='" + ids[i] + "'>" + nodes[i] + " - " + ids[i] + "</option>";
    }

    contentHTML += "</select>";

    // Insert HTML fields that correspond to the thing
    contentHTML += " <br> Full name: <input type='text' name='editfullname' id='editfullname' placeholder='Edit me...'> <br> Birthdate: <input type='date' id='editbirthdate' name='editbirthdate'> Deceased? <input type='checkbox' id='checkbox' onchange='checkboxChange(this)'> <br> <div id='editdeathdiv'> Death: <input type='date' id='editdeathdate' name='editdeathdate'> </div> <br> <input type='submit' value='Submit changes'> </form> </div>";

    editcontent.innerHTML = contentHTML;

    editspan = document.getElementsByClassName('editclose')[0];
    editspan.onclick = function() {
        editmodal.style.display = "none";
    }

}

removebtn.onclick = function() {

    // Get names of leaf nodes only
    var children = getChildren();

    // Get IDs of leaf nodes only
    var IDs = getLeafIDs();

    if (children.length > 0) {

        // Make modal visible
        removemodal.style.display = "block";

        // Begin inner html string
        var contentHTML = "<div class='modal-edge-remove'>Remove a node</div> <span class='removeclose'>&times;</span> <div id='addform'> <form action='removenode.php' method='post'> <br><br> Child to remove: <select name='children'>";

        for (i = 0; i < children.length; i++) {
            contentHTML += "<option value='" + IDs[i] + "'>" + children[i] + " - " + IDs[i] + "</option>";
        }

        contentHTML += "</select> <br><br><br> <input type='submit' value='REMOVE PERSON FROM FAMILY!'> </form> </div>";

        removecontent.innerHTML = contentHTML;

        removespan = document.getElementsByClassName("removeclose")[0];
        removespan.onclick = function() {
            removemodal.style.display = "none";
        }
    } else {
            // Else, an empty set was returned.
            alert("Don't do that. You can't remove more people.");
    }
}

addbtn.onclick = function() {

    // Make modal visible
    addmodal.style.display = "block";

    // Begin inner html string
    var contentHTML = "<div class='modal-edge-add'>Add a node</div> <span class='addclose'>&times;</span> <div id='addform'> <form action='addnode.php' method='post'> Full name: <input type='text' id='fullname' placeholder='Trevor' name='fullname'> <br> Child of: <select name='parents'>";

    // Perform search to find all names in the tree
    var parents = getParents();

    // Perform search to find all corresponding IDs in the tree - this will be corresponding to parents and getParents() function
    var ids = getIDs();

    // For each parent, add an option to select it
    for (i = 0; i < parents.length; i++) {
        // Print out name of parents + id number they have
        contentHTML += "<option value='" + ids[i] + "'>" + parents[i] + " - " + ids[i] + "</option> ";
    }

    // Add other fields + submit button
    contentHTML += "</select> <br> Birthdate: <input type='date' id='birthdate' name='birthdate'> Deceased? <input type='checkbox' onchange=addCheckChange(this)> <br> <div id='adddeathdiv'> Death: <input type='date' id='deathdate' name='deathdate'> </div> <br> <input type='submit' value='Add to tree!'> </form> </div>";

    // Modify inner html
    addcontent.innerHTML = contentHTML;

    // Make X button work again
    addspan = document.getElementsByClassName("addclose")[0];
    addspan.onclick = function() {
        addmodal.style.display = "none";
    }

    // To add the content to the tree, it will be inserted into the database here.
    // Additionally, perform a check here to insert the appropriate HTMLclass field
    // Do this by finding the HTMLclass field that the parent (name retrievable from select box) and
    //  placing the corresponding one in there
    //  ex: "white" -> children are blue
    //      "blue"  -> children are white

}

window.onclick = function(event) {
    if (event.target == addmodal) {
        addmodal.style.display = "none";
    } else if (event.target == removemodal) {
        removemodal.style.display = "none";
    } else if (event.target == editmodal) {
        editmodal.style.display = "none";
    }
}