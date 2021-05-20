// Variables
var algorithmType = 1;
var speed = 1000;
/*
 * Algorithm Drop Down Menu
 */
function handleAlgorithmDropdown() {
    var element = document.getElementById("Algorithm-Dropdown-Container");
    if (!element.classList.contains("show-algo-dropdown")) {
        element.classList.add("show-algo-dropdown");
    } else {
        element.classList.remove("show-algo-dropdown");
    }
}
function handleCCclick() {
    algorithmType = 1;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "Key is a number between 0 and 26";
}
function handleMCclick() {
    algorithmType = 2;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "Key is 26 letters, no repeats";
}
function handleHCclick() {
    algorithmType = 3;
    document.getElementById("Key-Help-Pop-Up").innerHTML = "Key format: Letters A-Z, after each letter put number n (between 1-9) and then n unique symbols (no space) \nExample: A 2 &* B 3 e-D C 1 , ...";
}
/*
 * Speed Drop Down Menu
 */
function handleSpeedDropdown() {
    var element = document.getElementById("Speed-Dropdown-Container");
    if (!element.classList.contains("show-speed-dropdown")) {
        element.classList.add("show-speed-dropdown");
    } else {
        element.classList.remove("show-speed-dropdown");
    }
}
function handleSFclick() {
    var element = document.getElementById("Speed-Button");
    element.innerHTML = "Speed: Fast  ";
    speed = 1;
}
function handleSMclick() {
    var element = document.getElementById("Speed-Button");
    element.innerHTML = "Speed: Medium";
    speed = 200;
}
function handleSSclick() {
    var element = document.getElementById("Speed-Button");
    element.innerHTML = "Speed: Slow  ";
    speed = 1000;
}

/*
 * Encrypt/Decrypt Drop Down Menu
 */
function handleCryptDropdown() {
    var element = document.getElementById("Crypt-Dropdown-Container");
    if (!element.classList.contains("show-crypt-dropdown")) {
        element.classList.add("show-crypt-dropdown");
    } else {
        element.classList.remove("show-crypt-dropdown");
    }
}
function handleCEclick() {
    var element = document.getElementById("Crypt-Selection-Button");
    element.innerHTML = "Encrypt";
    element = document.getElementById("Crypt-Button");
    element.innerHTML = "Encrypt!";
}
function handleCDclick() {
    var element = document.getElementById("Crypt-Selection-Button");
    element.innerHTML = "Decrypt";
    element = document.getElementById("Crypt-Button");
    element.innerHTML = "Decrypt!";
}
/*
 * Encryption/Decryption Algorithm Implementations
 */
function caesarCipher(text, shift) {
    var encrypt_text = '';
    for(let i = 0; i < text.length; i++) {
        encrypt_text += String.fromCharCode(text.charCodeAt(i) - shift);
    }
    return encrypt_text;
}

/*
 * Show the pop-up for the help button
 */
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
 * Encrypt/Decrypt Button 
 *   Starts main program functionality
 */

function handleCryptButton() {
    //alert("Test");
    //$("#Title-Button").html("Test!");
    var textInput = document.getElementById("Message-Text-Box").value;
    var newText = "";
    displayWord(textInput);
    /*
    switch(algorithmType) {
        case 1:
            newText = caesarCipher(textInput, 3);
            break;
        case 2:
            break;
        case 3:
            break;  
        default:
            alert("Error in switch case");
            break;
    }*/
    // Update new Text
    //document.getElementById("hello").innerHTML = newText;
}


// Need to make double array in the future
// Store based on index (stack), last element is the highest up on stack
var flipElementsState = [];
var characterList = ["purple", "blue", "green", "yellow", "orange", "red", "white", "percent", "degree",
"qm", "bslash", "fslash", "rbr", "lbr", "per", "com", "dquote", "squote", "mul", "colon", "sc", "eq", "and", "add", "us", "min",
"car", "rpar", "lpar", "cash", "hash", "as", "ex", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z", "Y", "X", "W", "V",
"U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
// Note: ~ is equal to the degree sign
var rawInputCharacterList = ["%", "~", "?", ">", "<", ".", ",", "*", ":", ";", "=", "&", "_", "-",
"^", ")", "(", "$", "#", "@", "!", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Z", "Y", "X", "W", "V",
"U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];

function populateStateIDs(num) {
    var componentState = [];
    for (var i = 0; i < characterList.length; i++) {
        var id1 = "t_" + characterList[i] + "_" + num;
        var id2 = "b_" + characterList[i] + "_" + num;
        componentState.push(id1);
        componentState.push(id2);
    }
    flipElementsState.push(componentState);
}

/*
 * Function for initializing the React Flip Board
 */
function initializeBoard() {
    var topX = 180;
    for (var i = 0; i < 4; i++) {
        var id = "#row" + i;
        var top = (topX + i * 160) + "px";
        $(id).css("top", top);
    }
    $("#col0").css({"left":"0px","width":"15px"});
    for (var i = 1; i < 16; i++) {
        var id = "#col" + i;
        var left = (75 + 90 * (i-1)) + "px";
        $(id).css("left", left);
    }
    $("#col16").css({"right":"0px", "width":"15px"});
    setFlipBoardElementLocations();
}


function setFlipBoardElementLocations() {
    for (var i = 0; i < 64; i++) {
        populateStateIDs(i);
    }
    //console.log("Array: " + flipElementsState.toString());
    var left = 0;
    var top = 100;
    for (var i = 0; i < flipElementsState.length; i++) {
        if (i != 0 && i % 16 == 0) {
            top += 160;
            left = 0;
        }
        for (var j = 0; j < flipElementsState[i].length-1; j+=2) {
            var topID = flipElementsState[i][flipElementsState[i].length-2-j];
            document.getElementById(topID).style.left = (left + 15) + "px";
            document.getElementById(topID).style.top = top + "px";
            var bottomID = flipElementsState[i][flipElementsState[i].length-1-j];
            document.getElementById(bottomID).style.left = (left + 15) + "px";
            document.getElementById(bottomID).style.top = (top + 40) + "px";
        }
        left += 90;
        console.log("Styled component " + i + " at " + (left + 90*i) + " " + top);
        setFlipBoardElementsIndexZ(i);
    }
}
/*
 * Function that will layer the React Elements based on the current positioning in the state array
 */
function setFlipBoardElementsIndexZ(num) {
    for (var i = 1; i <= flipElementsState[num].length; i++) {
        document.getElementById(flipElementsState[num][i-1]).style.zIndex = i;
    }
}
function shiftStack(num) {
    var temp1 = flipElementsState[num][flipElementsState[num].length-2];
    var temp2 = flipElementsState[num][flipElementsState[num].length-1];
    for (var i = flipElementsState[num].length-1; i > 1; i--) {
        flipElementsState[num][i] = flipElementsState[num][i-2];
    }
    flipElementsState[num][0] = temp1;
    flipElementsState[num][1] = temp2;
}
function flipAllCon(num) {
    if (num <= 0) {
        return;
    }
    flipAll(0, 64);
    setTimeout(function() {
        flipAllCon(num-1);
    }, speed*3);
}

function flipAll(i, num) {
    if (i >= num) {
        //console.log("Stopped");
        return;
    }
    simulateFlip(i);
    flipAll(i+1, num);
}

function flipTimeControl(i, wait) {
    if (i >= 64) {
        return;
    }
    if (wait) {
        setTimeout(function(){
            simulateFlip(i);
            flipControl(i+1, wait);
        }, 500);
    }
    else {
        simulateFlip(i);
        flipTimeControl(i+1, wait);
    }
}

/*Simulate Flip Button*/
function simulateFlip(componentNum) {
    var i = componentNum;
    var top = 100;
    var j = componentNum;
    while(j >= 16) {
        j -= 16;
        top += 160;
    }
    var bottom = top + 40;
    var topID = "#" + flipElementsState[i][flipElementsState[i].length-2];
    var bottomID = "#" + flipElementsState[i][flipElementsState[i].length-1];
    $(topID).animate({'top':bottom+"px"}, speed, function() {
        $(topID).animate({'top':(bottom+40)+"px"}, speed);
        $(bottomID).animate({'top':(bottom+40)+"px"}, speed, function() {
            shiftStack(i);
            setFlipBoardElementsIndexZ(i);
            $(topID).animate({'top':top+"px"}, (speed));
            $(bottomID).animate({'top':bottom+"px"}, (speed));
        });
    });
}

function displayWord(word) {
    if (word.length > 30) {
        alert("Word is too long");
        return;
    }
    var wordLetters = word.split("");
    for (var i = 0; i < wordLetters.length; i++) {
        var letter = wordLetters[i];
        var fakeID;
        if (rawInputCharacterList.indexOf(letter) < 0) {
            alert("Not valid character");
        } else{
            switch(letter) {
                case "%":
                    fakeID = "b_percent_"+i;
                    break;
                case "~":   //Degree
                    fakeID = "b_deg_"+i;
                    break;
                case "?":
                    fakeID = "b_qm_"+i;
                    break;
                case ">":
                    fakeID = "b_rbr_"+i;
                    break;
                case "<":
                    fakeID = "b_lbr_"+i;
                    break;
                case ".":
                    fakeID = "b_per_"+i;
                    break;
                case ",":
                    fakeID = "b_com_"+i;
                    break;
                case "*":
                    fakeID = "b_mul_"+i;
                    break;
                case ":":
                    fakeID = "b_col_"+i;
                    break;
                case ";":
                    fakeID = "b_sc_"+i;
                    break;
                case "=":
                    fakeID = "b_eq_"+i;
                    break;
                case "&":
                    fakeID = "b_and_"+i;
                    break;
                case "+":
                    fakeID = "b_add_"+i;
                    break;
                case "_":
                    fakeID = "b_us_"+i;
                    break;
                case "-":
                    fakeID = "b_min_"+i;
                    break;
                case "^":
                    fakeID = "b_car_"+i;
                    break;
                case ")":
                    fakeID = "b_rpar_"+i;
                    break;
                case "(":
                    fakeID = "b_lpar_"+i;
                    break;
                case "$":
                    fakeID = "b_cash_"+i;
                    break;
                case "#":
                    fakeID = "b_hash_"+i;
                    break;
                case "@":
                    fakeID = "b_as_"+i;
                    break;
                case "!":
                    fakeID = "b_ex_"+i;
                    break;
                default:
                    fakeID = "b_"+letter+"_"+i;
                    break;
            }
        }
        var flipsNeeded = ((flipElementsState[i].length-1) - flipElementsState[i].indexOf(fakeID))/2;
        alert("Need " + flipsNeeded + " flips for character " + letter);
    }
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