//Global variables.
//variable birthdayCalObj will contain object of BirthdayCal class.
var birthdayCalObj = null,
//variable errorBoxObj will contain object of Error class.
    errorBoxObj = null;

//This IIFE will contain all initialization code of the application.
(function init() {
    var updateButtonObj = document.getElementById("update-button");
    if (updateButtonObj !== null) {
        document.getElementById("update-button").addEventListener("click", updateCalendar);
    }
    birthdayCalObj = new BirthdayCal();
    //Creating Error class object: Passing is of a label, which will be used use for showing error messages.
    errorBoxObj = new Error("error-msg-label");
})();

//This function will be called when user clicks update button.
function updateCalendar() {
    var yearInputObj, textAreaObj, year, jsonString;
    //Validating year input.
    yearInputObj = document.getElementById("year-input");
    if (yearInputObj !== null) {
        year = yearInputObj.value;
        //Removing error class from year input.
        errorBoxObj.clearErrorMsg(yearInputObj);
        //Checking if the year entered is a 4 digit number or not.
        if (!/^[0-9]{4}$/.test(year)) {
            //If the entered year fails the test, then highlight the input in red and show error msg.
            errorBoxObj.setErrorMsg(yearInputObj, CONSTANTS.ERRORS.INVALID_DATE);
            return;
        }
    }
    //Validating text area input.
    textAreaObj = document.getElementById("json-input");
    //Removing error class from text area input.
    errorBoxObj.clearErrorMsg(textAreaObj);
    if (textAreaObj !== null) {
        jsonString = textAreaObj.value;
        //Parsing json string using JSON.parse.
        try {
            jsonString = JSON.parse(jsonString);
        } catch (error) {
            //If Parsing using JSON.parse if failed the use eval.
            try {
                jsonString = eval(jsonString);
            } catch (error) {
                //If parsing is failed using eval then set errorMsg and highlight the test area.
                errorBoxObj.setErrorMsg(textAreaObj, CONSTANTS.ERRORS.INVALID_JSON_ARRAY);
                return;
            }
        } finally {
            //Checks if the parsed string is not an Array then set errorMsg and highlight the test area.
            if (!Array.isArray(jsonString)) {
                errorBoxObj.setErrorMsg(textAreaObj, CONSTANTS.ERRORS.INVALID_JSON_ARRAY);
                return;
            }
        }
    }
    //If all inputs are valid then update the cards.
    birthdayCalObj.updateCards("calendar-area", jsonString, year);
}
