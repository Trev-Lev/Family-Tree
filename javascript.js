
var simple_chart_config = {
    chart: {
        container: "#tree-simple",
        connectors: {
            type: "step"
        },
        
        node: {
            collapsable: true,
            HTMLclass: (inEditMode ? "editable" : "normal")
        },
        
        animation: {
                nodeAnimation: "easeOutQuad", // easeOutBounce
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
        }
    },
    
    nodeStructure: {
        
        // Images?
        
        text: { name: "Parent node" }, // comma here
        children: [
            {   
                text: { name: "First child" }
            },
            {
                text: { name: "Another child"}
            },
            {
                text: { name: "Trevor"},
                children: [
                    {
                        text: { name: "John"}
                    },
                    {
                        text: { name: "Jay"}
                    }
                ]
            }
        ]
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

var tree = new Treant(simple_chart_config);
    
var count = 1;
function add() {

    // Insert a node!
    var toAdd = {
        text: { name: "Child " + count}
    };
    
    simple_chart_config.nodeStructure.children.push(toAdd);
    console.log(count);
    count++;
    //editMode();
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