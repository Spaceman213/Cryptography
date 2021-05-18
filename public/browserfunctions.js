var algorithmType = 1;

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
}
function handleMCclick() {
    algorithmType = 2;
}
function handleHCclick() {
    algorithmType = 3;
}

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
function caesarCipher(text, shift) {
    var encrypt_text = '';
    for(let i = 0; i < text.length; i++) {
        encrypt_text += String.fromCharCode(text.charCodeAt(i) - shift);
    }
    return encrypt_text;
}

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