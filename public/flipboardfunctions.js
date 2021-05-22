// Store based on index (stack), last element is the highest up on stack
var globalFlipBoardState = [];
var SLMap = new Map();

// Order is alphaSheet2, alphaSheet1, numberSheet
var globalBoolState = [];
var componentLocations = [];
var characterList = [
    "p", "b", "g", "y", "o", "r", "w", "%", "?", ">", "<", ".", ",",
    "*", ":", ";", "=", "&", "+", "_", "-", "^", ")", "(", "$", "#",
    "@", "!", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z",
    "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M",
    "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", " "
];
// Timing data will be length of the MAX amount of flips, in our case: 65 - 1 = 64
var timingDataMedium = [
    1000, 300, 100, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
];
var totalComponents = 64;
//var opposite = false;
var speed = 1000;
function initializeBoard() {
    initializeBoolState();
    populateSLMap();
    populateState();
    initializeLocations();
    setLocations();
    setAllZ();
}
function setAllZ() {
    for (var i = 0; i < totalComponents; i++) {
        setIndexZ(i);
    }
}

function printState() {
    for (var i = 0; i < globalFlipBoardState.length; i++) {
        var s = "";
        for (var j = 0; j < globalFlipBoardState[i].length; j++) {
            s += globalFlipBoardState[i][j] + " ";
        }
        console.log(s);
    }
}

function initializeBoolState() {
    for (var i = 0; i < totalComponents; i++) {
        globalBoolState.push(true);
    }
    //console.log("GBS:" + globalBoolState.toString());
}

function initializeLocations() {
    var LEFT = 15;
    var TOP = 150;
    for (var i = 0; i < 5; i++) {
        $("#row" + i).css({"top":((TOP-80) + i * 160)+"px"});
    }
    $("#col0").css({"top":(TOP-80)+"px", "left":"0px", "width": LEFT + "px"});
    for (var i = 1; i < 16; i++) {
        $("#col" + i).css({"top":(TOP-80)+"px", "left":((LEFT + 60) + 90 * (i - 1))+"px"});
    }
    $("#col16").css({"top":(TOP-80)+"px", "right":"0px", "width": LEFT + "px"});
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 16; c++) {
            var coords = [];
            coords.push(LEFT + (c * 90));
            coords.push(TOP + (r * 160));
            componentLocations.push(coords);
        }
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
    for (var i = 0; i < totalComponents; i++) {
        var spriteLength = 7740;
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
        $("#FS_0_0_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 1]});
        $("#FS_1_0_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + 40 + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 2]});
        $("#FS_0_1_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 3]});
        $("#FS_1_1_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + 40 + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 4]});
    }
}
/*
 * Function that will layer the React Elements based on the current positioning in the state array
 */
function setIndexZ(component) {
    var i = component;
    if (globalBoolState[i]) {
        //alert("here");
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
function flipRepeat(x, component) {
    if (x <= 0) {
        return;
    }
    flip(component, timingDataMedium[x - 1]);
    setTimeout(function() {
        flipRepeat(x-1, component);
    }, timingDataMedium[x - 1] + 20);
}

function flip(component, s) {
    var i = component;
    var TID; var BID;
    if (!globalBoolState[i]) {
        TID = "#FS_0_0_" + i;
        BID = "#FS_1_0_" + i;
    } else {
        TID = "#FS_0_1_" + i;
        BID = "#FS_1_1_" + i;
    }
    var animateSpeed = s / 2;
    $(TID).animate({'top': componentLocations[i][1] + 40 + "px"}, animateSpeed, function() {
        $(TID).animate({'top': componentLocations[i][1] + 80 + "px"}, animateSpeed);
        $(BID).animate({'top': componentLocations[i][1] + 80 + "px"}, animateSpeed, function() {
            shiftSpritePosition(component);
            setIndexZ(component);
            $(TID).animate({'top': componentLocations[i][1] + "px"}, 1); // Might not need to animate
            $(BID).animate({'top': componentLocations[i][1] + 40 + "px"}, 1);
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


function refactorWord(word) {
    var inputChars = word.split("");
    var newChars = [];
    var color = false;
    for (var i = 0; i < inputChars.length; i++) {
        if (color) {
            switch (inputChars[i]) {
                case "r":
                case "o":
                case "y":
                case "g":
                case "b":
                case "p":
                    newChars.push(inputChars[i]);
                    color = false;
                    break;
                default:
                    alert("Not valid char after ~")
            }
        }
        else if (inputChars[i] == inputChars[i].toUpperCase()) {
            if (inputChars[i] == "~") {
                color = true;
                if (i == (inputChars.length - 1)) {
                    alert("Cannot end with ~");
                }
            }
            else {
                newChars.push(inputChars[i]);
            }
        } else {
            newChars.push(inputChars[i].toUpperCase());
        }
    }
    return newChars;
}
function refactorNL(charArray) {
    var newChars = [];
    var newLinesBefore = 1;
    var i = 0;
    for (var l = 0; l < charArray.length; l++) {
        if (charArray[l] == "|") {
            var j = i;
            while ((j + 1) % 16 != 0) {
                j++;
            }
            console.log("Nearest End: " + j);
            console.log("Spaces NLB: " + newLinesBefore);
            var spaces = j - i + newLinesBefore;
            console.log("Spaces between: " + spaces);
            for (var k = 0; k < spaces; k++) {
                newChars.push(" ");
                i++;
            }
            newLinesBefore++;
        } else {
            newChars.push(charArray[l]);
        }
        i++;
    }
    return newChars;
}

function displayWord(word) {
    var letters;
    letters = refactorWord(word);
    letters = refactorNL(letters);
    if (letters.length > totalComponents) {
        alert("Word is too long");
    }
    for (var i = letters.length; i < totalComponents; i++) {
        letters.push(" ");
    }
    for (var i = 0; i < letters.length; i++) {
        console.log("Letter: " + letters[i]);
        var locations = SLMap.get(letters[i]);
        console.log("Location: " + locations[0] + " " + locations[1]);
        var r = (globalFlipBoardState[i].length / 2) - (globalFlipBoardState[i].indexOf(locations[0]) / 2) - 1;
        flipRepeat(r, i);
    }
}
function displayFromTextBox() {
    //console.log(document.getElementById("Message-Text-Box").value);
    displayWord(document.getElementById("Message-Text-Box").value);
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