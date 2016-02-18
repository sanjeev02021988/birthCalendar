//This class shows error messages in the dom element provided and highlights the target element in red.
function Error(id) {
    var errorBoxObj, errorClassName = "error";
    //Getting object of the errorBox where error messages needs to be shown.
    errorBoxObj = document.getElementById(id);

    //Exposed API
    this.setErrorMsg = setErrorMsg;
    this.clearErrorMsg = clearErrorMsg;

    //Implementations
    //This function will set error message to the target element.
    function setErrorMsg(targetElement, errorMsg) {
        errorBoxObj.innerHTML = errorMsg;
        if (typeof errorMsg !== "undefined" && errorMsg !== "") {
            addErrorClass(targetElement);
        }
    }
    //This function will clear error messages from the target element un till user sends clearMsg as false.
    function clearErrorMsg(targetElement, clearMsg){
        if(clearMsg !== false){
            errorBoxObj.innerHTML = "";
        }
        removeErrorClass(targetElement);
    }

    function addErrorClass (targetElement) {
        if(!targetElement || typeof targetElement.className === "undefined"){
            return;
        }
        targetElement.className += " " + errorClassName;
    }

    function removeErrorClass (targetElement) {
        if(!targetElement || typeof targetElement.className === "undefined"){
            return;
        }
        var regex = new RegExp("\\b" + errorClassName + "\\b", 'g');
        targetElement.className = targetElement.className.replace(regex, ' ');
    }
}