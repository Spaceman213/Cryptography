// Variables
var algorithmType = 1;

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
}
function handleSMclick() {
    var element = document.getElementById("Speed-Button");
    element.innerHTML = "Speed: Medium";
}
function handleSSclick() {
    var element = document.getElementById("Speed-Button");
    element.innerHTML = "Speed: Slow  ";
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
    }
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

function createElementIdAndPopulateState() {
    for (var i = 0; i < characterList.length; i++) {
        var id1 = "t_" + characterList[i] + "_0_0";
        var id2 = "b_" + characterList[i] + "_0_0";
        flipElementsState.push(id1);
        flipElementsState.push(id2);
    }
}

/*
 * Function for initializing the React Flip Board
 */
function setFlipBoardElementLocations() {
    createElementIdAndPopulateState();
    console.log("Array: " + flipElementsState.toString());
    for (var i = 0; i < flipElementsState.length-1; i+=2) {
        document.getElementById(flipElementsState[flipElementsState.length-2-i]).style.left = "10px";
        document.getElementById(flipElementsState[flipElementsState.length-2-i]).style.top = "100px";

        document.getElementById(flipElementsState[flipElementsState.length-1-i]).style.left = "10px";
        document.getElementById(flipElementsState[flipElementsState.length-1-i]).style.top = "140px";
    }
    setFlipBoardElementsIndexZ();
}
/*
 * Function that will layer the React Elements based on the current positioning in the state array
 */
function setFlipBoardElementsIndexZ() {
    for (var i = 1; i <= flipElementsState.length; i++) {
        document.getElementById(flipElementsState[i-1]).style.zIndex = i;
    }
}
function shiftZState() {
    var temp1 = flipElementsState[flipElementsState.length-2];
    var temp2 = flipElementsState[flipElementsState.length-1];
    for (var i = flipElementsState.length-1; i > 1; i--) {
        flipElementsState[i] = flipElementsState[i-2];
    }
    flipElementsState[0] = temp1;
    flipElementsState[1] = temp2;
}

function setIndexZAfterFlip() {
    var topID = "#" + flipElementsState[flipElementsState.length-2];
    var bottomID = "#" + flipElementsState[flipElementsState.length-1];
    var speed = 1; // make divisible by 4
    $(topID).animate({'top':'140px'}, speed, function() {
        $(topID).animate({'top':'180px'}, speed);
        $(bottomID).animate({'top':'180px'}, speed, function() {
            shiftZState();
            setFlipBoardElementsIndexZ();
            $(topID).animate({'top':'100px'}, (speed));
            $(bottomID).animate({'top':'140px'}, (speed));
            setTimeout(function(){
                setIndexZAfterFlip();
            }, 200);
        });
    });
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
    setFlipBoardElementLocations();
});