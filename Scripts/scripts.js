
var textArea = document.getElementById("password");
var copyClipButton = document.getElementById("copy");
var generateBtn = document.getElementById("generate");

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
    var mPassword = "";

    var isLengthChk = document.getElementById("chkLength").checked;
    var isSpecialChk = document.getElementById("chkSpecial").checked;
    var isNumChk = document.getElementById("chkNumeric").checked;
    var isLowerChk = document.getElementById("chkLower").checked;
    var isUpperChk = document.getElementById("chkUpper").checked;

    //TODO:PASSWORD CREATION ALGORITHM

    return mPassword;

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