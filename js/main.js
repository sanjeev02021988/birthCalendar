var birthdayCalObj = null;
(function init() {
    document.getElementById("update-button").addEventListener("click", updateCalendar);
    birthdayCalObj = new BirthdayCal();
})();

function updateCalendar() {
    var year, jsonString, errorBoxObj, yearInputObj, textAreaObj;
    yearInputObj = document.getElementById("year-input");
    errorBoxObj = document.getElementById("error-msg-label");
    errorBoxObj.innerHTML = "";
    if (yearInputObj) {
        year = yearInputObj.value;
        yearInputObj.className = "app__input js-year";
        if (year % 1 !== 0) {
            yearInputObj.className += " error";
            errorBoxObj.innerHTML = "Invalid Date...";
            return;
        }
    }
    textAreaObj = document.getElementById("json-input");
    if (textAreaObj) {
        jsonString = textAreaObj.value.replace(/\s\s+/g, ' ');
    }
    textAreaObj.className = "app__txt js-json";
    try {
        jsonString = JSON.parse(jsonString);
    } catch (error) {
        try {
            jsonString = eval(jsonString);
            if (!Array.isArray(jsonString)) {
                textAreaObj.className += " error";
                errorBoxObj.innerHTML = "Not a JSON array...";
                return;
            }
        } catch (error) {
            textAreaObj.className += " error";
            errorBoxObj.innerHTML = "Invalid JSON...";
            return;
        }
    }
    birthdayCalObj.updateCards("calendar-area", jsonString, year);
}
