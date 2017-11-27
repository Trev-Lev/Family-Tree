var simple_chart_config = {
    chart: {
        container: "#tree-simple",
        connectors: {
            type: "step"
        },
        
        node: {
            collapsable: true,
            //HTMLclass: (inEditMode ? "editable" : "normal")
        },
        
        animation: {
                nodeAnimation: "easeOutQuad", // easeOutBounce
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
        }
    },
    
    nodeStructure: {
        
        text: { name: "Parent node" }, // comma here
        HTMLclass: "blue",
        
          // here
        children: [
            {   
                text: { name: "First child" },
                HTMLclass: "white"
            },
            {
                text: { name: "Another child"},
                HTMLclass: "white"
            },
            {
                text: { name: "Trevor"},
                HTMLclass: "white",
                children: [
                    {
                        text: { name: "John"},
                        HTMLclass: "blue"
                    },
                    {
                        text: { name: "Jay"},
                        HTMLclass: "blue"
                    }
                ]
            }
        ]
         // here
    }
};

var inEditMode = false;

function viewAccountPage() {
    console.log("view account button was pressed!")
}

function toggleMode() {
    
    // Toggle the variable
    inEditMode = !inEditMode;
    
    console.log("toggle mode button was pressed!")
    editMode(inEditMode);
    

    
    // Display the same tree without editable features

}

// Mode is true/false
function editMode(inEditMode) {
    // Display the same tree but with editable features
    if (inEditMode) {
        for (i = 0; i < simple_chart_config.nodeStructure.children.length; i++) {
            var editString = "<input type='text' name='name' placeholder='";
            editString += simple_chart_config.nodeStructure.children[i].text.name;
            editString += "' id='treantinputbox";
            editString += i;
            editString += "'>";
            simple_chart_config.nodeStructure.children[i].innerHTML = editString; 
        }
        redraw();
    } else {    // Switched out of edit mode
        for (i = 0; i < simple_chart_config.nodeStructure.children.length; i++) {
        
            var value; 
            
            if (document.getElementById("treantinputbox"+i).value != '') {
                value = document.getElementById("treantinputbox" + i).value;
                simple_chart_config.nodeStructure.children[i].text.name = value;   
            }
            
            /*
            if(simple_chart_config.nodeStructure.children[i].innerHTML.text != null) {
                value = simple_chart_config.nodeStructure.children[i].innerHTML.value;
                simple_chart_config.nodeStructure.children[i].text.name = value;
            }
            */
            
            simple_chart_config.nodeStructure.children[i].innerHTML = "";
        }
        redraw();
    }
}

function exitAccount() {
    console.log("exit account button was pressed!")
}

// Returns a list of the names of all the nodes, as all are eligible to be parents 
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
        for (j = 0; list[i][j] != '}'; j++) {
            if (list[i][j] != '"') stringToAdd += list[i][j];
        }
        quotedNames.push(stringToAdd);
    }
    return quotedNames; // Finished product
}

var tree = new Treant(simple_chart_config);
    
var count = 1;

function add() {

    // Display a modal asking for characteristics
    // If success, enter into database and redraw
    
    // Modal displayed
    
    redraw();
}

function redraw() {
    tree = "";
    tree = new Treant(simple_chart_config);
}

function remove() {
    var index = simple_chart_config.nodeStructure.children.length - 1;
    simple_chart_config.nodeStructure.children.splice(index, 1);
    redraw();
    count--;
    if (count < 0) count = 0;
}

/* Modal for adding new nodes */
var modal = document.getElementById('modal');
var btn = document.getElementById("addbutton");
var span = document.getElementsByClassName("close")[0];
var content = document.getElementById('modal-content'); 

btn.onclick = function() {
    modal.style.display = "block";
    
    var contentHTML = "<span class='close'>&times;</span> <div id='leftalign'> Full name: <input type='text'id='fullname' placeholder='Trevor'> <br> Child of: <select name='cars'>";
    
    // Perform search to find all names in the tree
    var parents = getParents();
    
    // For each parent, add an option to select it
    for (i = 0; i < parents.length; i++) {
        contentHTML += "<option value='" + parents[i] + "'>" + parents[i] + "</option> ";
    }
    //<option value='audi'>Audi</option>
    contentHTML += "</select> </div>";
    
    // Modify inner html
    content.innerHTML = contentHTML;
    
    // Make X button work again
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
}

/*
span.onclick = function() {
    modal.style.display = "none";
}
*/
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

