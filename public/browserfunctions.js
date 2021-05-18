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
    document.getElementById("hello").innerHTML = newText;
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