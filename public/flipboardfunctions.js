// Store based on index (stack), last element is the highest up on stack
var globalFlipBoardState = [];
var SLMap = new Map();

// Order is alphaSheet2, alphaSheet1, numberSheet
var globalBoolState = [true];
var componentLocations = [];
var characterList = ["p","b","g","y","o","r","w","%", "~", "?", ">", "<", ".", ",", "*", ":", ";", "=", "&", "_", "-",
"^", ")", "(", "$", "#", "@", "!", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z", "Y", "X", "W", "V",
"U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", " "];
var totalComponents = 1;
//var opposite = false;
var speed = 100;
function initializeBoard() {
    populateSLMap();
    populateState();
    initializeLocations();
    setLocations();
    setIndexZ();
}

function initializeLocations() {
    var LEFT = 10;
    var TOP = 100;
    for (var i = 0; i < totalComponents; i++) {
        var coords = [];
        coords.push(LEFT);
        coords.push(TOP);
        componentLocations.push(coords);
    }
}
function populateSLMap() {
    var spriteLength = 7740;
    var i = 0;
    for (var j = spriteLength; j >= 0; j -= 120) {
        var locations = [];
        locations.push("-" + j + "px");
        locations.push("-" + (j - 60) + "px");
        SLMap.set(characterList[i], locations);
        i++;
    }
}
function populateState() {
    var spriteLength = 7740;
    for (var i = 0; i < totalComponents; i++) {
        var componentState = []
        for (var j = spriteLength; j >= 0; j -= 60) {
            var location = "-" + j + "px";
            componentState.push(location);
        }
        globalFlipBoardState.push(componentState);
    }
}

/*
 * Function for initializing the React Flip Board
 */
function setLocations() {
    for (var i = 0; i < totalComponents; i++) {
        console.log(componentLocations[i][0] + ", " + componentLocations[i][1]);
        console.log(componentLocations[i][0] + ", " + componentLocations[i][1] + 40);
        $("#FS_0_0_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 1]});
        $("#FS_1_0_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + 40 + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 2]});
        $("#FS_0_1_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 3]});
        $("#FS_1_1_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + 40 + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 4]});
    }
}
/*
 * Function that will layer the React Elements based on the current positioning in the state array
 */
function setIndexZ() {
    for (var i = 0; i < totalComponents; i++) {
        if (globalBoolState[i]) {
            $("#FS_0_0_" + i).css({"z-index":"3"});
            $("#FS_1_0_" + i).css({"z-index":"4"});
            $("#FS_0_1_" + i).css({"z-index":"1"});
            $("#FS_1_1_" + i).css({"z-index":"2"});
        } else {
            $("#FS_0_0_" + i).css({"z-index":"1"});
            $("#FS_1_0_" + i).css({"z-index":"2"});
            $("#FS_0_1_" + i).css({"z-index":"3"});
            $("#FS_1_1_" + i).css({"z-index":"4"});
        }
        globalBoolState[i] = !globalBoolState[i];
    }
}
function flipRepeat(x, component) {
    if (x <= 0) {
        return;
    }
    flip(component);
    setTimeout(function() {
        flipRepeat(x-1, component);
    }, speed*3);
}

function flip(component) {
    var i = component;
    var TID; var BID;
    if (!globalBoolState[i]) {
        TID = "#FS_0_0_" + i;
        BID = "#FS_1_0_" + i;
    } else {
        TID = "#FS_0_1_" + i;
        BID = "#FS_1_1_" + i;
    }
    $(TID).animate({'top': componentLocations[i][1] + 40 + "px"}, speed, function() {
        $(TID).animate({'top': componentLocations[i][1] + 80 + "px"}, speed);
        $(BID).animate({'top': componentLocations[i][1] + 80 + "px"}, speed, function() {
            shiftSpritePosition(component);
            setIndexZ();
            $(TID).animate({'top': componentLocations[i][1] + "px"}, 1); // Might not need to animate
            $(BID).animate({'top': componentLocations[i][1] + 40 + "px"}, 1);
            /*setTimeout(function(){
                flip(component);
            }, speed*2);*/
        });
    });

}

function shiftSpritePosition(component) {
    var i = component;
    var T1 = globalFlipBoardState[i][globalFlipBoardState[i].length-2];
    var T2 = globalFlipBoardState[i][globalFlipBoardState[i].length-1];
    for (var j = globalFlipBoardState[i].length - 1; j > 1; j--) {
        globalFlipBoardState[i][j] = globalFlipBoardState[i][j-2];
    }
    globalFlipBoardState[i][0] = T1;
    globalFlipBoardState[i][1] = T2;

    if (globalBoolState[i]) {
        $("#FS_0_1_" + i).css({"background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 3]});
        $("#FS_1_1_" + i).css({"background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 4]});
    }
    else {
        $("#FS_0_0_" + i).css({"background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 3]});
        $("#FS_1_0_" + i).css({"background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 4]});
    }
}

function displayWord(word) {
    if (word.length > totalComponents) {
        alert("Word is too long");
        //flip(0);
    }
    //for (var i = 0; i < characterList.length; i++) {
    //    console.log(characterList[i] + ": " + SLMap.get(characterList[i])[0] + " " + SLMap.get(characterList[i])[1]);
    //}
    var letters = word.split("");
    var locations = SLMap.get(letters[0]);
    //console.log("Locations: " + locations[0] + " " + locations[1]);
    //$("#FS_0_0_0").css({"background-position": SLMap.get(letters[0])[1]});
    //$("#FS_1_0_0").css({"background-position": SLMap.get(letters[0])[0]});
    
    var r = (globalFlipBoardState[0].length / 2) - (globalFlipBoardState[0].indexOf(locations[0]) / 2) - 1;

    flipRepeat(r, 0);

    //console.log(locations.toString());
    //console.log("R: " + r);
}


/*
 * Event Listener for the entire website
 */
document.addEventListener("click", function(event){
    if (!(event.target.id == "Algorithm-Button")) {
        var element = document.getElementById("Algorithm-Dropdown-Container");
        if (element.classList.contains("show-algo-dropdown")) {
            element.classList.remove("show-algo-dropdown");
        }
    }
    if (!(event.target.id == "Speed-Button")) {
        var element = document.getElementById("Speed-Dropdown-Container");
        if (element.classList.contains("show-speed-dropdown")) {
            element.classList.remove("show-speed-dropdown");
        }
    }
    if (!(event.target.id == "Crypt-Selection-Button")) {
        var element = document.getElementById("Crypt-Dropdown-Container");
        if (element.classList.contains("show-crypt-dropdown")) {
            element.classList.remove("show-crypt-dropdown");
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    initializeBoard();
});