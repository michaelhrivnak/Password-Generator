
var textArea = document.getElementById("password");
var copyClipButton = document.getElementById("copy");
var generateBtn = document.getElementById("generate");

//set our allowed characters
var specialChars = "~!@#$%^&*_-+={}[]:;<>,.?/";
var lowerCaseChars = "abcdefghijklmnopqrstuvxyz";
var upperCaseChars = lowerCaseChars.toUpperCase();
var numericChars = "0123456789";

//on button click
function generate(){
    
    //create the password
    textArea.innerText = createPassword();
    
    //enable the copy button
    copyClipButton.removeAttribute("disabled");
    copyClipButton.classList.remove("disabled");
}

//copy to the clipboard
function copyClip(){

    textArea.select();
    textArea.setSelectionRange(0, 99999); //mobile
    
    document.execCommand("copy");
    
    alert("Password Copied to Clipboard");
    clearSelection();
}
//generate the password based on criteria
function createPassword(){
    var mPassword = [];
    var totalCharSet = "";
    var passwordResult = "";

    var inputLength = parseInt(document.getElementById("lengthSliderInput").value);
    var isSpecialChk = document.getElementById("chkSpecial").checked;
    var isNumChk = document.getElementById("chkNumeric").checked;
    var isLowerChk = document.getElementById("chkLower").checked;
    var isUpperChk = document.getElementById("chkUpper").checked;
    
    //TODO:PASSWORD CREATION ALGORITHM

    //ensure at least one character of each type of checked character is included.
    if (isSpecialChk){
        totalCharSet += specialChars;
        var randomPos = getRandom(specialChars.length);
        mPassword.push(specialChars.substr(randomPos,1));
    }
    if(isNumChk){
        totalCharSet += numericChars;
        var randomPos = getRandom(numericChars.length);
        mPassword.push(numericChars.substr(randomPos,1));
    }
    if(isLowerChk){
        totalCharSet += lowerCaseChars;
        var randomPos = getRandom(lowerCaseChars.length);
        mPassword.push(lowerCaseChars.substr(randomPos,1));
    }
    if(isUpperChk){
        totalCharSet += upperCaseChars;
        var randomPos = getRandom(upperCaseChars.length);
        mPassword.push(upperCaseChars.substr(randomPos,1));
    }

    if(mPassword.length > 0){

        for(var i = mPassword.length ; i < inputLength ; i++){
            var randomPos = getRandom(totalCharSet.length);
            mPassword.push(totalCharSet.substr(randomPos,1));
        }
        while(mPassword.length > 0){
            passwordResult += mPassword.splice(getRandom(mPassword.length),1).toString();
        }
        
    }else{
        alert("oops, something went wrong, please try again.");
    }

    //Randomize the result
   
    return passwordResult;
   

}
function getRandom(range){

    return Math.floor(Math.random()*range);

}

function validate(){
    var isValid = false;
    var validAlert = document.getElementById("validateAlert");
    var inputs = document.querySelectorAll(".checkbox");
    
    //check if inputs are checked.
    for(var i = 0 ; i < inputs.length; i++){
        
        if (inputs[i].checked){
            isValid = true;
        }
    }
   
    // update the ui
    if(isValid){
        validAlert.style.visibility = "hidden";
        generateBtn.disabled = false;
        generateBtn.classList.remove("disabled");
    }else{       
        validAlert.style.visibility = "visible";
        generateBtn.disabled = true;
        generateBtn.classList.add("disabled"); 
           
    }

}

//clear the selection after copying (UI reasons, found on stack overflow)
function clearSelection() {
    var sel;
    if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if ( tagName == "textarea" ||
                    (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}
//updates the range number indicator
function updateRangeValue(elem){

    var rangeText = document.getElementById("rangeValue");
    rangeText.innerText = elem.value.toString(); 
    
}