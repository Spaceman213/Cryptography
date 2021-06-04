
/* 
 * ================================================================|
 * Global Variables                                                |
 * ================================================================|
 */
var algorithmType = 0;
var stackAnimating = [];
var globalFlipBoardState = [];
var SLMap = new Map();
var startUp = true;
var globalBoolState = [];
var componentLocations = [];
var characterList = [
    "p", "b", "g", "y", "o", "r", "w", "%", "?", ">", "<", ".", ",",
    "*", ":", ";", "=", "&", "+", "_", "-", "^", ")", "(", "$", "#",
    "@", "!", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z",
    "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M",
    "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", " "
];
var timingDataMedium = [
        1000, 300, 100, 50,
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50
];
var totalComponents = 64;
var speed = 1000;

/* 
 * ================================================================|
 * Initializtion Methods                                           |
 * ================================================================|
 */
function initializeBoard() {
    initializeBoolState();
    populateSLMap();
    populateState();
    initializeLocations();
    setLocations();
    setAllZ();
}
function initializeBoolState() {
    for (var i = 0; i < totalComponents; i++) {
        globalBoolState.push(true);
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
function initializeLocations() {
    var page_height = $(document).height();
    var page_width = $(document).width();
    
    if (page_height < 720 || page_width < 1440) {
        alert("Window is too small to load the required HTML elements");
        return;
    }
    var LEFT = ((page_width - 1440) / 2) + 15;
    var TOP = (page_height - 720) / 2 + 80;
    // Center the Board Rows
    $("#row0").css({"top":"60px", "height" : (TOP - 60) + "px"});
    for (var i = 1; i < 4; i++) {
        $("#row" + i).css({"top":((TOP-80) + i * 160)+"px"});
    }
    $("#row4").css({"bottom":"45px", "height" : (TOP - 45) + "px"});
    // Center the Board Columns
    $("#col0").css({"top":(TOP-80)+"px", "left":"0px", "width": LEFT + "px"});
    for (var i = 1; i < 16; i++) {
        $("#col" + i).css({"top":(TOP-80)+"px", "left":((LEFT + 60) + 90 * (i - 1))+"px"});
    }
    $("#col16").css({"top":(TOP-80)+"px", "right":"0px", "width": LEFT + "px"});
    // Set Locations of the actual Flip Components
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 16; c++) {
            var coords = [];
            coords.push(LEFT + (c * 90));
            coords.push(TOP + (r * 160));
            componentLocations.push(coords);
        }
    }
}
// Function for initializing the React Flip Board
function setLocations() {
    for (var i = 0; i < totalComponents; i++) {
        $("#FS_0_0_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 1]});
        $("#FS_1_0_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + 40 + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 2]});
        $("#FS_0_1_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 3]});
        $("#FS_1_1_" + i).css({"left": componentLocations[i][0] + "px", "top": componentLocations[i][1] + 40 + "px", "background-position": globalFlipBoardState[i][globalFlipBoardState[i].length - 4]});
    }
}
function setAllZ() {
    for (var i = 0; i < totalComponents; i++) {
        setIndexZ(i);
    }
}
// Function that will layer the React Elements based on the current positioning in the state array
function setIndexZ(component) {
    var i = component;
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
// Used for Debugging
function printState() {
    for (var i = 0; i < globalFlipBoardState.length; i++) {
        var s = "";
        for (var j = 0; j < globalFlipBoardState[i].length; j++) {
            s += globalFlipBoardState[i][j] + " ";
        }
        console.log(s);
    }
}

/* 
 * ================================================================|
 * Text Proccessing and Display Methods                            |
 * ================================================================|
 */
// Refactors a word to a valid string of chars for the flip board to process and covert
function refactorWord(word) {
    var inputChars = word.split("");
    var newChars = [];
    var color = false;
    for (var i = 0; i < inputChars.length; i++) {
        if (color) {
            switch (inputChars[i]) {
                case "w":
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
                    console.log(inputChars[i]);
                    break;
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
// Handles the new line char from strings
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
            var spaces = j - i + newLinesBefore;
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
/*// Function called upon start-up for displaying word
function displayFromTextBox() {
    displayWord(document.getElementById("Message-Text-Box").value);
}*/
function fullRefactorWord(word) {
    var letters;
    letters = refactorWord(word);
    if (letters.length <= 32) {
        letters.unshift("|");
    }
    letters = refactorNL(letters);
    if (letters.length > totalComponents) {
        alert("Word is too long");
    }
    for (var i = letters.length; i < totalComponents; i++) {
        letters.push(" ");
    }
    return letters;
}
function displayWord(letters) {
    for (var i = 0; i < letters.length; i++) {
        var locations = SLMap.get(letters[i]);
        var r = (globalFlipBoardState[i].length / 2) - (globalFlipBoardState[i].indexOf(locations[0]) / 2) - 1;
        flipRepeat(r, i);
    }
}
/* 
 * ================================================================|
 * Animation Functions and Helper Methods                          |
 * ================================================================|
 */
function animateStartScreen() {
    var randomComponent = Math.floor(Math.random() * 64);
    while (stackAnimating.indexOf(randomComponent) != -1) {
        randomComponent = Math.floor(Math.random() * 64);
    }
    stackAnimating.push(randomComponent);
    flipRepeat(65, randomComponent);
    setTimeout(function() {
        if (stackAnimating.length > 15) {
            stackAnimating.splice(0, 1);
        }
        if (startUp) {
            animateStartScreen();
        }
    }, 500);
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
function flipRepeat(x, component) {
    if (x <= 0) {
        return;
    }
    flip(component, timingDataMedium[x - 1]);
    setTimeout(function() {
        flipRepeat(x-1, component);
    }, timingDataMedium[x - 1] + timingDataMedium[timingDataMedium.length - 1]);
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

/* 
 * ================================================================|
 * Cipher Functions and Helper Methods                             |
 * ================================================================|
 */
var cipherCharacterList = [
    "%", "?", ">", "<", ".", ",", "*", ":", ";", "=", "&",
    "+", "_", "-", "^", ")", "(", "$", "#", "@", "!", "0",
    "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z", "Y",
    "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N",
    "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C",
    "B", "A", " "
];
function createRandomKey() {
    var key = [];
    switch(algorithmType) {
        case 1:
            key.push(Math.floor(Math.random() * 57) + 1);
            break;
        case 2:
            var shuffledCharList = copyArray(cipherCharacterList);
            shuffleArray(shuffledCharList);
            for (var i = 0; i < shuffledCharList.length; i++) {
                key.push(shuffledCharList[i]);
            }
            break;
        case 3:
            break;  
        default:
            alert("Error in switch case RK");
            return;
    }
    console.log("Randomly Gen-ed Key: " + key.toString());
    return key;
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function copyArray(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }
    return newArray;
}

// Returns the encrypted Caesar text
function caesarCipher(text, shift) {
    console.log("CC: " + text + " " + shift);
    if (shift > 57) {
        alert("Shift is too great for CC");
    }
    text = text.toUpperCase();
    var encrypt_text = "";
    for(let i = 0; i < text.length; i++) {
        //console.log("Old index: " + cipherCharacterList.indexOf(text.charAt(i)));
        var newIndex = cipherCharacterList.indexOf(text.charAt(i)) - shift;
        if (newIndex < 0) {
            newIndex += newIndex.length;
        }
        //console.log(newIndex);
        encrypt_text += cipherCharacterList[newIndex];
    }
    return encrypt_text;
}

// Returns the encrypted Monoalphabetic text
function monoCipher(text, key) {
    console.log("MC: " + text + " " + key.toString());
    var encrypt_text = "";
    for (var i = 0; i < text.length; i++) {
        var index = cipherCharacterList.indexOf(text.charAt(i));
        encrypt_text += key[index];
    }
    return encrypt_text;
}

/* 
 * ================================================================|
 * Buttton Handlers                                                |
 * ================================================================|
 */

// First Click on Message Box to stop stack Animating
function handleEnterTestClick() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
    }
}

// Click on "Algorithm" Button, shows dropdown
function handleAlgorithmDropdown() {
    var element = document.getElementById("Algorithm-Dropdown-Container");
    if (!element.classList.contains("show-algo-dropdown")) {
        element.classList.add("show-algo-dropdown");
    } else {
        element.classList.remove("show-algo-dropdown");
    }
}
// Click on "Caesar Cipher" Dropdown button
function handleCCclick() {
    algorithmType = 1;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "Key: [1 - 61]";
    document.getElementById("Crypt-Button").innerHTML = document.getElementById("Crypt-Selection-Button").innerHTML + " Caesar!";
}
// Click on "Monoalphabetic Cipher" Dropdown button
function handleMCclick() {
    algorithmType = 2;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "Key: scramble[ABCDEFG...]";
    document.getElementById("Crypt-Button").innerHTML = document.getElementById("Crypt-Selection-Button").innerHTML + " Mono!";
}
// Click on "Homophonic Cipher" Dropdown button
function handleHCclick() {
    algorithmType = 3;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "Key: [A[s1,s2,s3]B[s1]C[s1,s2]D[s1]...]";
    document.getElementById("Crypt-Button").innerHTML = document.getElementById("Crypt-Selection-Button").innerHTML + " Homo!";
}

// "Encrypt / Decrypt" Button, shows dropdown
function handleCryptDropdown() {
    var element = document.getElementById("Crypt-Dropdown-Container");
    if (!element.classList.contains("show-crypt-dropdown")) {
        element.classList.add("show-crypt-dropdown");
    } else {
        element.classList.remove("show-crypt-dropdown");
    }
}
// "Encrypt" Button
function handleCEclick() {
    var element = document.getElementById("Crypt-Selection-Button");
    element.innerHTML = "Encrypt";
    element = document.getElementById("Crypt-Button");
    if (element.innerHTML.length == 8) {
        element.innerHTML = "Encrypt!";
    } else {
        var c = element.innerHTML.split(" ");
        element.innerHTML = "Encrypt " + c[1];
    }
}
// "Decrypt" Button
function handleCDclick() {
    var element = document.getElementById("Crypt-Selection-Button");
    element.innerHTML = "Decrypt";
    element = document.getElementById("Crypt-Button");
    if (element.innerHTML.length == 8) {
        element.innerHTML = "Decrypt!";
    } else {
        var c = element.innerHTML.split(" ");
        element.innerHTML = "Decrypt " + c[1];
    }
}

// Handle "?" Button, shows the pop-up for the help button
function handleKeyHelpButton() {
    var element = document.getElementById("Key-Help-Pop-Up");
    if (!element.classList.contains("show")) {
        element.classList.add("show");
    }
    else {
        element.classList.remove("show");
    }
}

// Handle the "Encrypt!" "Decrypt! Button
function handleCryptButton() {
    var textInput = document.getElementById("Message-Text-Box").value;
    if (algorithmType == 0) {
        displayWord(fullRefactorWord(textInput));
        return;
    }
    if (textInput.indexOf("~") != -1) {
        alert("Cannot add color to encryption")
    }
    textInput = textInput.toUpperCase();
    var key = document.getElementById("Key-Text-Box").value;
    if (key == "Random") {
        key = createRandomKey();
    }
    var newText = "";
    displayWord(fullRefactorWord(textInput));
    switch(algorithmType) {
        case 1:
            newText = caesarCipher(textInput, key[0]);
            break;
        case 2:
            newText = monoCipher(textInput, key);
            break;
        case 3:
            break;  
        default:
            alert("Error in switch case CB");
            break;
    }
    setTimeout(function() {
        displayWord(fullRefactorWord(newText));
    }, 8000);
}

// Handle Clear Button
function handleClearButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord(" ");
        }, 8000);
    } else {
        displayWord(" ");
    }
}

// Handle Random Button
function handleRandomButton() {
    var word = "";
    for (var i = 0; i < 64; i++) {
        var r = Math.floor(Math.random() * 65);
        var letter = characterList[r];
        if (letter.toUpperCase() != letter) {
            letter = "~" + letter;
        }
        word += letter;
    }
    console.log(word);
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord(word);
        }, 8000);
    } else {
        displayWord(word);
    }
}

// Handle All Button
function handleAllButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$()^-_+=;:*,.<>?%~w~r~o~y~g~b~p");
        }, 8000);
    } else {
        displayWord("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$()^-_+=;:*,.<>?%~w~r~o~y~g~b~p");
    }
}

// Handle Hello World Button
function handleHelloWorldButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord("  HELLO WORLD,   THIS IS A TEST");
        }, 8000);
    } else {
        displayWord("  HELLO WORLD,   THIS IS A TEST");
    }
}

// Handle PI Button
function handlePiButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord("3.14159265358979323846264338327950288419716939937510582097494459");
        }, 8000);
    } else {
        displayWord("3.14159265358979323846264338327950288419716939937510582097494459");
    }
}

// Handle Wave Button Function, will return to string before when animation is done
function handleWaveButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            animateClearWave(0);
        }, 8000);
    } else {
        animateClearWave(0);
    }
}
// Helper Method
function animateClearWave(component) {
    if (component >= 64) {
        return;
    }
    //if (stackAnimating.indexOf(component) == -1) {
    flipRepeat(65, component);
    setTimeout(function() {
        animateClearWave(component + 1);
    }, 50);
}

// Handle Checker Button, 
function handleCheckerButton() {
    var i = 0;
    for (var r = 0; r < 64; r+=16) {
        for (var c = r + i; c < r + 16; c+=2) {
            flipRepeat(65, c);
            console.log("Flipping: " + c);
        }
        i = (i == 0) ? 1 : 0;
    }
    setTimeout(function() {
        i = 1;
        for (var r = 0; r < 64; r+=16) {
            for (var c = r + i; c < r + 16; c+=2) {
                flipRepeat(65, c);
                console.log("Flipping: " + c);
            }
            i = (i == 0) ? 1 : 0;
        }
    }, 300);
}

/* 
 * ================================================================|
 * Event Listeners                                                 |
 * ================================================================|
 */
document.addEventListener("click", function(event){
    if (!(event.target.id == "Algorithm-Button")) {
        var element = document.getElementById("Algorithm-Dropdown-Container");
        if (element.classList.contains("show-algo-dropdown")) {
            element.classList.remove("show-algo-dropdown");
        }
    }
    if (!(event.target.id == "Crypt-Selection-Button")) {
        var element = document.getElementById("Crypt-Dropdown-Container");
        if (element.classList.contains("show-crypt-dropdown")) {
            element.classList.remove("show-crypt-dropdown");
        }
    }
});
document.addEventListener("keyup", function(event) {
    if (event.code === "Enter") {
        handleCryptButton()
    }
});
document.addEventListener("DOMContentLoaded", function() {
    initializeBoard();
    //animateStartScreen();
});