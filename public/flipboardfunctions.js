/* 
 * ================================================================|
 * Global Variables                                                |
 * ================================================================|
 */
var algorithmType = 0;
var algorithmEncrypt = true;
var stackAnimating = [];
var globalFlipBoardState = [];
var SLMap = new Map();
var startUp = true;
var globalBoolState = [];
var componentLocations = [];
// Length is 65
var characterList = [
    "p", "b", "g", "y", "o", "r", "w", "%", "?", ">", "<", ".", ",",
    "*", ":", ";", "=", "&", "+", "_", "-", "^", ")", "(", "$", "#",
    "@", "!", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z",
    "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M",
    "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", " "
];
// Total time for the MAX FLIP is 2.00 seconds, total length is 64
var timingDataMedium = [
        400, 200, 100, 100,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20
];
var timingDataFast = [
    230, 100, 50, 20,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5
];

var totalComponents = 64;
var speed = 1000;
var globalKey;
var waitToED;
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
    
    $("#row0").css({"top":"60px", "height" : (TOP - 60) + "px"});
    for (var i = 1; i < 4; i++) {
        $("#row" + i).css({"top":((TOP-80) + i * 160)+"px"});
    }
    $("#row4").css({"bottom":"45px", "height" : (TOP - 45) + "px"});
    $("#Board-Background").css({"height" : (page_height - 105) + "px"});

    // Initialize the Key
    $("#circle1").css({"left" : (page_width / 2) + "px"});
    $("#circle2").css({"left" : (page_width / 2) + 15 + "px"});
    $("#handle").css({"left" : (page_width / 2) - 76 + "px"});
    $("#tooth").css({"left" : (page_width / 2) - 72 + "px"});
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

//Calculate the timing of the visualizer based on the flips
function calculateWaitTime(flips, timingData) {
    var total = 0;
    for (i = 0; i < flips; i++) {
        total += timingData[i] + timingData[i]/2;
    }
    total /= 1000;
    return Math.ceil(total);
}
function clockCountdown(seconds) {
    $("#clock-text").html(seconds);
    if (seconds <= 0) {
        return;
    }  
    setTimeout(function() {
        clockCountdown(seconds - 1);
    }, 1000);
}

// Displays the word on the screen by calling flips to the correct elements
function displayWord(letters, timingData) {
    var longestWait = 0;
    for (var i = 0; i < letters.length; i++) {
        var locations = SLMap.get(letters[i]);
        var r = (globalFlipBoardState[i].length / 2) - (globalFlipBoardState[i].indexOf(locations[0]) / 2) - 1;
        
        temp = calculateWaitTime(r, timingData);
        if (temp > longestWait) {
            longestWait = temp;
        }
        // r is how many times being flipped, i is component
        flipRepeat(r, i, timingData);
    }
    // If estimate time is less than 1 sec, show 1 instead of 0
    clockCountdown(longestWait);
    waitToED = longestWait * 1000;
}
/* 
 * ================================================================|
 * Animation Functions and Helper Methods                          |
 * ================================================================|
 */
function animateStartScreen(i) {
    timeout = 5000;
    if (i == 0) {
        timeout = 3000;
    }
    d = new Date();
    displayWord(fullRefactorWord(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()), timingDataFast);
    setTimeout(function() {
        if (startUp) {
            animateStartScreen(i+1);
        }
    }, timeout);
    return;
    /*var randomComponent = Math.floor(Math.random() * 64);
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
    }, 500);*/
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
// timing data is going to be an array that is passed in
function flipRepeat(x, component, timingData) {
    if (x <= 0) {
        return;
    }
    flip(component, timingData[x - 1]);
    setTimeout(function() {
        flipRepeat(x-1, component, timingData);
    }, timingData[x - 1] + (timingData[x - 1]/2) /*timingDataMedium[timingDataMedium.length - 1]*/);
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
var alphabet = [
    "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N",
    "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"
];

// Generates a random key based on what the algorithm selected is
function createRandomKey() {
    var key = [];
    switch(algorithmType) {
        // Creates a key for caesar cipher
        case 1:
            key.push(Math.floor(Math.random() * 25) + 1);
            break;
        // Creates a key for mono cipher
        case 2:
            var shuffledAlphabet = copyArray(alphabet);
            shuffleArray(shuffledAlphabet);
            for (var i = 0; i < shuffledAlphabet.length; i++) {
                key.push(shuffledAlphabet[i]);
            }
            break;
        // Creates a key for homo cipher
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
function caesarCipherE(text, shift) {
    console.log("CC: " + text + " " + shift);
    if (shift >= 26) {
        alert("Shift is too great for CC");
    }
    text = text.toUpperCase();
    var encrypt_text = "";
    for(let i = 0; i < text.length; i++) {
        if (text.charAt(i) == ' ') {
            encrypt_text += ' ';
        }
        else if (alphabet.indexOf(text.charAt(i)) == -1) {
            alert("Only use letters in cipher");
            return;
        }
        else {
            var newIndex = alphabet.indexOf(text.charAt(i)) - shift;
            if (newIndex < 0) {
                newIndex += alphabet.length;
            }
            encrypt_text += alphabet[newIndex];
        }
    }
    return encrypt_text;
}
function caesarCipherD(text, shift) {
    return caesarCipherE(text, 26 - shift);
}

// Returns the encrypted Monoalphabetic text
function monoCipherE(text, key) {
    console.log("MC: " + text + " " + key.toString());
    var encrypt_text = "";
    for (var i = 0; i < text.length; i++) {
        var index = alphabet.indexOf(text.charAt(i));
        encrypt_text += key[index];
    }
    return encrypt_text;
}
function monoCipherD(text, key) {
    var decrypt_text = "";
    for (var i = 0; i < text.length; i++) {
        var index = key.indexOf(text.charAt(i));
        decrypt_text += alphabet[index];
    }
    return decrypt_text;
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
function handleNclick() {
    algorithmType = 0;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "No Algorithm Selected";
    document.getElementById("Crypt-Button").innerHTML = "Display!";
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
    algorithmEncrypt = true;
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
    algorithmEncrypt = false;
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

/* 
 * ================================================================|
 * MAIN FUNCTION                                                   |
 * ================================================================|
 */
// Handle the "Encrypt!" "Decrypt!" or "Display!" Button
function handleCryptButton() {
    // First grab input data
    var textInput = document.getElementById("Message-Text-Box").value;
    globalKey = document.getElementById("Key-Text-Box").value;
    // Check if user only wants to display
    if (algorithmType == 0) {
        displayWord(fullRefactorWord(textInput), timingDataMedium);
        return;
    }
    // Refactor text
    if (textInput.indexOf("~") != -1) {
        alert("Cannot add color to encryption")
    }
    textInput = textInput.toUpperCase();
    // Create key for decrypting
    if (!algorithmEncrypt) {
        if (globalKey == "random") {
            alert("Not wise to decrypt message with random key");
        }
        else {
            // Need to format key from user input
        }
    }
    // Create key for encrypting
    if (algorithmEncrypt) {
        if (globalKey == "random") {
            globalKey = createRandomKey();
        }
        else {
            // Need to format key from user input
        }
    }
    // Display the original word
    displayWord(fullRefactorWord(textInput), timingDataMedium);

    var newText = "";
    switch(algorithmType) {
        case 1:
            newText = (algorithmEncrypt) ? caesarCipherE(textInput, globalKey[0]) : caesarCipherD(textInput, globalKey[0]);
            break;
        case 2:
            newText = (algorithmEncrypt) ? monoCipherE(textInput, globalKey) : monoCipherD(textInput, globalKey);
            break;
        case 3:
            break;  
        default:
            alert("Error in switch case CB");
            break;
    }
    //TODO
    setTimeout(function() {
        // Display the new encrypted word after period of time
        displayWord(fullRefactorWord(newText), timingDataMedium);
    }, waitToED + 1000);
}

// Handle Clear Button
function handleClearButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord(fullRefactorWord(" "), timingDataMedium);
        }, 8000);
    } else {
        displayWord(fullRefactorWord(" "), timingDataMedium);
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
            displayWord(fullRefactorWord(word), timingDataMedium);
        }, 8000);
    } else {
        displayWord(fullRefactorWord(word), timingDataMedium);
    }
}

// Handle All Button
function handleAllButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord(fullRefactorWord("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$()^-_+=;:*,.<>?%~w~r~o~y~g~b~p"), timingDataMedium);
        }, 8000);
    } else {
        displayWord(fullRefactorWord("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$()^-_+=;:*,.<>?%~w~r~o~y~g~b~p"), timingDataMedium);
    }
}

// Handle Hello World Button
function handleHelloWorldButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord(fullRefactorWord("  HELLO WORLD,   THIS IS A TEST"), timingDataMedium);
        }, 8000);
    } else {
        displayWord(fullRefactorWord("  HELLO WORLD,   THIS IS A TEST"), timingDataMedium);
    }
}

// Handle PI Button
function handlePiButton() {
    if (startUp) {
        startUp = false;
        stackAnimating = [];
        setTimeout(function() {
            displayWord(fullRefactorWord("3.14159265358979323846264338327950288419716939937510582097494459"), timingDataMedium);
        }, 8000);
    } else {
        displayWord(fullRefactorWord("3.14159265358979323846264338327950288419716939937510582097494459"), timingDataMedium);
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
    flipRepeat(65, component, timingDataMedium);
    setTimeout(function() {
        animateClearWave(component + 1);
    }, 50);
}

// Handle Checker Button, 
function handleCheckerButton() {
    var i = 0;
    for (var r = 0; r < 64; r+=16) {
        for (var c = r + i; c < r + 16; c+=2) {
            flipRepeat(65, c, timingDataMedium);
            console.log("Flipping: " + c);
        }
        i = (i == 0) ? 1 : 0;
    }
    setTimeout(function() {
        i = 1;
        for (var r = 0; r < 64; r+=16) {
            for (var c = r + i; c < r + 16; c+=2) {
                flipRepeat(65, c, timingDataMedium);
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
    //animateStartScreen(0);
});
window.addEventListener("resize", function() {
    initializeLocations();
    this.location.reload();
});