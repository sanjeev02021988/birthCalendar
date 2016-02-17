//This class is a singleton class. This class exposes API which only processes the data and using the processed data updates the DOM.
var BirthdayCal = (function () {
    var instance;
    var workspaceObj;

    return function (id) {
        if (instance) {
            return instance;
        }
        instance = this;
        //Exposed methods of BirthdayCal.
        this.updateCards = updateCards;
        return instance;
    };

    //This function show weeklyCalendar and accepts two arguments is JSON birthday array and year.
    function updateCards(id, birthdays, year) {
        workspaceObj = document.getElementById(id);
        var dayNamesMap = processData(birthdays, year);
        updateWeeklyCards(dayNamesMap);
    }

    //This function process the data and categorize names if year filter is matched.
    function processData(birthdays, year) {
        var i, j, date, birthdayObj, dayNamesMap = [], initials, day, currentYearDate, tempDate;
        currentYearDate = new Date(year);
        for (i = 0; i < birthdays.length; i++) {
            birthdayObj = birthdays[i];
            //Generating date out of birthday string.
            date = new Date(birthdayObj.birthday);
            if (isNaN(date.getDate())) {
                if (birthdayObj.name) {
                    console.log(birthdayObj.name + " has invalid birthday!!!");
                }
                continue;
            }
            if (year <= date.getFullYear()) {
                continue;
            }
            currentYearDate.setMonth(date.getMonth());
            currentYearDate.setDate(date.getDate());
            day = (currentYearDate.getDay() + 6) % 7;
            //Initialize entry in dayNamesMap, If entry against a day doesn't exist.
            if (!dayNamesMap[day]) {
                dayNamesMap[day] = [];
            }
            //Getting initials out of the name.
            var splits = birthdayObj.name.split(" ");
            initials = "";
            for (j = 0; j < splits.length; j++) {
                if (splits[j]) {
                    initials += splits[j][0];
                }
            }
            //Inserting the initials in sorted manner from youngest to oldest.
            for (j = 0; j < dayNamesMap[day].length; j++) {
                var dayNameObj = dayNamesMap[day][j];
                if (date > dayNameObj.date) {
                    break;
                }
            }
            dayNamesMap[day].splice(j, 0, {initials: initials, date: date});
        }
        return dayNamesMap;
    }

    //This function updates cards html for the processed data.
    function updateWeeklyCards(dayNamesMap) {
        var calDays, calDay, calDayPeople, htmlStr = "", namesArray,
            squaresPerRow, sideLength, i, j;
        calDays = workspaceObj.getElementsByClassName("cal__day");
        for (i = 0; i < calDays.length; i++) {
            calDay = calDays[i];
            if (calDay) {
                htmlStr = "";
                calDayPeople = calDay.getElementsByClassName("day__people")[0];
                namesArray = dayNamesMap[i] ? dayNamesMap[i] : [];
                calDay.className = "cal__day";
                if (namesArray.length === 0) {
                    calDay.className += " day--empty";
                    calDayPeople.innerHTML = htmlStr;
                    continue;
                }
                //Getting number of initials to render per row.
                squaresPerRow = Math.sqrt(namesArray.length);
                squaresPerRow = (parseInt(squaresPerRow) !== squaresPerRow) ? parseInt(squaresPerRow) + 1 : squaresPerRow;
                //Getting dimensions of a square
                sideLength = calDayPeople.clientWidth / squaresPerRow;
                for (j = 0; j < namesArray.length; j++) {
                    //Creating html for each square for a weekday
                    htmlStr += "<div class='day__person' style='width:" + sideLength + "px;height:" + sideLength + "px;'>";
                    htmlStr += namesArray[j].initials;
                    htmlStr += "</div>";
                }
                calDayPeople.innerHTML = htmlStr;
            }
        }
    }
})();





