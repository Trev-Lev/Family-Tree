/* 

    MODALS LOOKS WEIRD! MAYBE RESIZE THEM? I DONT KNOW

*/

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
    },
    
    nodeStructure: {
        
        text: { name: "Parent node",
                title: "February 25th, 1997"
              }, 
        HTMLclass: "blue",
        
        // To test how the tree works with only one node (initial state), comment out like below:
        // /*
        children: [
            {   
                text: { name: "First child",
                        title: "June 18th, 2017"
                      },
                HTMLclass: "white"
            },
            {
                text: { name: "Another child",
                        title: "July 19th, 1997"
                      },
                HTMLclass: "white"
            },
            {
                text: { name: "Trevor",
                        title: "In the near future"
                      },
                HTMLclass: "white",
                children: [
                    {
                        text: { name: "John",
                                title: "December 25th, 2017"
                              },
                        HTMLclass: "blue"
                    },
                    {
                        text: { name: "Jay",
                                title: "January 1st, 2017"
                              },
                        HTMLclass: "blue"
                    }
                ]
            }
        ]
         // */
    }
};

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

// Creates the tree!
var tree = new Treant(simple_chart_config);
    
// Don't know if I will use yet to be honest
function add() {

    // Display a modal asking for characteristics
    // If success, enter into database and redraw
    
    // Modal displayed
    
    redraw();
}

// This function will have some php interaction. It needs to retrieve everything from the database,
// import it into the JSON object simple_chart_config.nodeStructure, and then
// redraw the tree: tree = new Treant(simple_chart_config);
function redraw() {
    tree = "";
    tree = new Treant(simple_chart_config);
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
// Use "add" or "remove" spans
var editcontent = document.getElementById('modal-content-edit');

editbtn.onclick = function() {

    editmodal.style.display = "block";
    
    // Get list of all names of parents
    var nodes = getParents();
    
    // <form action='editnode.php'>
    
    var contentHTML = "<div class='modal-edge-edit'> Edit a node </div> <span class='addclose'>&times;</span> <div id='addform'> <br> Node to edit: <select id='nodes-edit-id' name='children'>";

    for (i = 0; i < nodes.length; i++) {
        contentHTML += "<option value='" + nodes[i] + "'>" + nodes[i] + "</option> "; 
    }
    
    contentHTML += "</select> </div>";
    editcontent.innerHTML = contentHTML;
    
    // Get the selection tag
    var selection = document.getElementById("nodes-edit-id");
    
    // On selection of node, open up a field for everything!
    var nodeToEdit = selection.value;
    
    //
    $('#nodes-edit-id').on('change', function() {
        alert(this.value);
    })
    
    // Reusing the addspan span
    addspan = document.getElementsByClassName("addclose")[0];
    addspan.onclick = function() {
        editmodal.style.display = "none";
    }
    
}

removebtn.onclick = function() {
    
    // Get names of leaf nodes only
    var children = getChildren();
    
    if (children.length > 0) {

        // Make modal visible
        removemodal.style.display = "block";
        
        // Begin inner html string
        var contentHTML = "<div class='modal-edge-remove'>Remove a node</div> <span class='removeclose'>&times;</span> <div id='addform'> <form action='removenode.php'> <br><br> Child to remove: <select name='children'>";

        for (i = 0; i < children.length; i++) {
            contentHTML += "<option value='" + children[i] + "'>" + children[i] + "</option> ";
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
    var contentHTML = "<div class='modal-edge-add'>Add a node</div> <span class='addclose'>&times;</span> <div id='addform'> <form action='addnode.php'> Full name: <input type='text' id='fullname' placeholder='Trevor'> <br> Child of: <select name='parents'>";
    
    // Perform search to find all names in the tree
    var parents = getParents();
    
    // For each parent, add an option to select it
    for (i = 0; i < parents.length; i++) {
        contentHTML += "<option value='" + parents[i] + "'>" + parents[i] + "</option> ";
    }

    // Add button to finalize addition of node to tree
    contentHTML += "</select> <br> <input type='submit' value='Add to tree!'> </form> </div>";
    
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

