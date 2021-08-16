const birthDate = document.querySelector("#bday");
const checkBtn = document.querySelector("#check");
//reverse function
function reverseString(word) {
    word = word.split("");
    var rev = "";
    while (word.length != 0) {
        rev += word.pop();
    }
    return rev;

}

//Boolean check Palindrome
function checkPalindrome(date) {
    const [year, month, day] = date.split("-");//using array destructuring
    const yyyymmdd = year + month + day;
    const ddmmyyyy = day + month + year;
    const mmddyyyy = month + day + year;
    const ddmmyy = day + month + year.slice(-2);
    const yymmdd = year.slice(-2) + month + day;
    const mmddyy = month + day + year.slice(-2);
    if (yyyymmdd === reverseString(yyyymmdd)) return [year + "/" + month + "/" + day, true];
    if (ddmmyyyy === reverseString(ddmmyyyy)) return [day + "/" + month + "/" + year, true];
    if (mmddyyyy === reverseString(mmddyyyy)) return [month + "/" + day + "/" + year, true];
    if (ddmmyy === reverseString(ddmmyy)) return [day + "/" + month + "/" + year.slice(-2), true];
    if (yymmdd === reverseString(yymmdd)) return [year.slice(-2) + "/" + month + "/" + day, true];
    if (mmddyy === reverseString(mmddyy)) return [month + "/" + day + "/" + year.slice(-2), true];
    return ["", false];

}

//to find no. of days in feb
function checkLeapYear(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            }
        }
    }
    return false;
}


var noOfDays = 0;
function findNextPalindromeDate(date) {
    noOfDays = 0;
    console.log(date);
    var [year, month, day] = date.split("-");
    var daysInMonth = [31, checkLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var nextDate;
    day = Number(day);
    month = Number(month);
    year = Number(year);

    while (true) {
        noOfDays++;
        day=day+1;
        if (day === daysInMonth[month - 1] + 1) {
            day = 1;
            month = month + 1;
        }
        if (month === 13) {
            month = 1;
            year = year + 1;
        }
        var yyyymmdd = year + "-" + (month <= 9 ? ("0".concat(month)) : month).toString() + "-" + (day <= 9 ? "0".concat(day.toString()) : day).toString();
        var [formdate, condi] = checkPalindrome(yyyymmdd);
        if (condi) {
            nextDate = formdate;
            return nextDate;
        }
    }
    return nextDate;
}

function clickHandler() {
    console.log("a");
    document.querySelector("#result").style.display = "block";
    var [formdate, state] = checkPalindrome(birthDate.value);
    var resultDate = formdate;
    if (state) {
        document.querySelector("#result").innerText = `You Birthday ${resultDate} is Palindrome!!`;
    }
    else {
        var nearDate = findNextPalindromeDate(birthDate.value);
        document.querySelector("#result").innerText = `Your Birthday is not palindrome. Next palindrome date is ${nearDate} which comes after ${noOfDays} days `;
    }

}


document.querySelector("#result").style.display = "none";
checkBtn.addEventListener("click", () => {

    if (birthDate.value === "") {
        document.querySelector("#result").style.display = "block";
        document.querySelector("#result").innerText = "date cannot be empty";
    }
    else {
        
        clickHandler();
    }
});
