//set some global elements
var textArea = document.getElementById("password");
var copyClipButton = document.getElementById("copy");
var generateBtn = document.getElementById("generate");
var slider = document.getElementById("lengthSliderInput");
var sliderTxt = document.getElementById("rangeValue");

//set our allowed characters
var specialChars = "`~!@#$%^&*_-+={}[]():;<>,.?/'";
var specilCharsExcluded = "!@#$%^&*_-+=?"; // excluded chacters: '{ } [ ] ( ) / \ ' " ` ~ , ; : . < >' 
var lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
var upperCaseChars = lowerCaseChars.toUpperCase();
var numericChars = "0123456789";
var minLength = 8;
var maxLength = 128;
var defaultLength = 16;

//onload: initalize values and events
onload = function(){
    
    //grab the elements we need
    var checkBoxes = document.querySelectorAll(".validCheckBox");
     
    //set default values for the slider
    slider.max = maxLength;
    slider.min = minLength;
    slider.value = defaultLength;
    sliderTxt.value = defaultLength;

    //set all the events
    generateBtn.onclick = generate;
    copyClipButton.onclick = copyClip;
    slider.onchange = function(){updateSliderTxtValue()};
    sliderTxt.onblur = function(){updateSliderTxtValue()};
    sliderTxt.oninput = function(){updateSliderValue()};
    
    //set all checkbox events
    for (var i = 0; i < checkBoxes.length;i++){        
        checkBoxes[i].onchange = validate;       
    }

    //fill in the default amount of slider on page load
    updateSliderBackground();
  
 }; 

//on button click
function generate(){
    
    //create the password
    textArea.innerText = createPassword();
    textArea.style.textAlign="left";
    
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
    //set up our variables
    var mPassword = [];
    var totalCharSet = "";
    var passwordResult = "";
    var randomPos = 0;

    //grab our input values
    var inputLength = parseInt(slider.value);
    var isSpecialChk = document.getElementById("chkSpecial").checked;
    var isExcludeAmbigChk = document.getElementById("chkExcludeAmbigChar").checked;
    var isNumChk = document.getElementById("chkNumeric").checked;
    var isLowerChk = document.getElementById("chkLower").checked;
    var isUpperChk = document.getElementById("chkUpper").checked;
    
    //ensure at least one character of each type of checked character is included.
    if (isSpecialChk){
        //change character set if ambiguous characters are to be excluded
        if(isExcludeAmbigChk){
            totalCharSet += specilCharsExcluded;
            randomPos = getRandomZeroToMax(specilCharsExcluded.length);    
            mPassword.push(specilCharsExcluded.substr(randomPos,1));
        }else{
            totalCharSet += specialChars;
            randomPos = getRandomZeroToMax(specialChars.length);
            mPassword.push(specialChars.substr(randomPos,1));
        }
        
    }
    //numeric characters
    if(isNumChk){
        totalCharSet += numericChars;
        randomPos = getRandomZeroToMax(numericChars.length);
        mPassword.push(numericChars.substr(randomPos,1));
    }
    //lowercase characters
    if(isLowerChk){
        totalCharSet += lowerCaseChars;
        randomPos = getRandomZeroToMax(lowerCaseChars.length);
        mPassword.push(lowerCaseChars.substr(randomPos,1));
    }
    //uppercase characters
    if(isUpperChk){
        totalCharSet += upperCaseChars;
        randomPos = getRandomZeroToMax(upperCaseChars.length);
        mPassword.push(upperCaseChars.substr(randomPos,1));
    }

    if(mPassword.length > 0){
        //gemerate remainder of password
        for(var i = mPassword.length ; i < inputLength ; i++){
            randomPos = getRandomZeroToMax(totalCharSet.length);
            mPassword.push(totalCharSet.substr(randomPos,1));
        }
        //Randomize the result
        while(mPassword.length > 0){
            passwordResult += mPassword.splice(getRandomZeroToMax(mPassword.length),1).toString();
        }
        
    }else{
        //just in case this somehow gets here
        alert("oops, something went wrong, please try again.");
    }
 
    return passwordResult;
}

//small helper function to increase readability
function getRandomZeroToMax(maxValue){

    return Math.floor(Math.random()*maxValue);

}

//check to see if at least one main checkbox is selected
function validate(){
    var isValid = false;
    var validAlert = document.getElementById("validateAlert");
    var inputs = document.querySelectorAll(".validCheckBox");
   
    if( this.id === "chkSpecial"){
         toggleAmbigCharChk();
    }
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
function updateSliderTxtValue(){
        
    sliderTxt.value = slider.value;
    //adjust the slider background based on value
    updateSliderBackground();
}

//updates the slider bar progress
function updateSliderBackground(){
    
    var min = parseInt(slider.getAttribute("min"));
    var max = parseInt(slider.getAttribute("max"));
    var val = parseInt(slider.value);

    slider.style.backgroundImage = 'linear-gradient(to right, #395d7C ' 
    + Math.round((val-min)/(max-min)*100) 
    + '%, #d3d3d3 ' + Math.round((val-min)/(max-min)*100) + '% )'; 
}

//control our inputs
function updateSliderValue(){
          
    if(validateSliderTextInput()){
        slider.value = parseInt(sliderTxt.value);
        updateSliderBackground();
    }
    
}

//control our inputs
function validateSliderTextInput(){
   var value = sliderTxt.value;

    if(isNaN(value)){
             
        return false;

    }else if(value < parseInt(slider.getAttribute("min"))){
        
        slider.value = slider.getAttribute("min");
        updateSliderBackground();
        return false;
  
    }else if (value > parseInt(slider.getAttribute("max"))){
        
        slider.value = slider.getAttribute("max");
        updateSliderBackground();
        return false;
  
    }else{
       
        return true;
    }
    
}
//toggles the hidden field for excluding ambiguous characters
function toggleAmbigCharChk(){
    var chkExcludeAmbigChar = document.getElementById("excludeAmbigChar");
    chkExcludeAmbigChar.toggleAttribute("hidden");
}