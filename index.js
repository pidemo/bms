console.log("latest-4.8.8.3");

/* 
// Form Prefill Testing
document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people").value = 20;
*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;


let mainSection = document.querySelector("#bookform-content");
let successSection = document.querySelector("#bookform-successful");

document.querySelector('#main-form-wrap').classList.add('is-hidden');

/*
// In wized now
let mainFormVeil = document.querySelector('#main-form-veil');
let dateForm = document.querySelector('#date-validation-form');
let dateConfirmation = document.querySelector('#date-confirmation-wrap');
let mainForm = document.querySelector('#main-form-wrap');
let dateDenied = document.querySelector('#bookform-denied');

if (fullHash.includes('approved')) {
    mainFormVeil.classList.remove('is-visible');
    dateForm.remove();
    dateConfirmation.classList.add('is-visible');
    mainForm.classList.remove('is-hidden');
} else {
    mainFormVeil.classList.add('is-visible');
};

if (fullHash.includes('denied')) {
    dateDenied.classList.add('is-visible');
};
*/
if (fullHash.includes('successful')) {
    mainSection.classList.add('is-hidden');
    successSection.classList.add('is-visible');
} else {
    successSection.classList.remove('is-visible');
    mainSection.classList.remove('is-hidden');
};

/*
//form prefill based on URL params :
var hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
for (var i = 0; i < hashParams.length; i++) {
    var p = hashParams[i].split('=');
    var prefix = 'c-';
    var target = prefix.concat(p[0]);
    var decoded = decodeURIComponent(p[1]);
    var element = document.getElementById(p[0]);
    if (element) { element.value = decoded; }
    var targetElement = document.getElementById(target);
    if (targetElement) { targetElement.innerText = decoded; }
};

// Date & GID auto fill
var dateString = document.getElementById('c-booking-date').textContent;
var timeString = document.getElementById('c-booking-time').textContent;
var timeEndString = document.getElementById('c-booking-time-end').textContent;


// Concatenate date and time strings
var startDateString = dateString + ' ' + timeString;
var endDateString = dateString + ' ' + timeEndString;
// Parse date strings into Date objects
var startDate = new Date(startDateString);
var endDate = new Date(endDateString);
// Format dates as strings
var startTimestamp = Math.floor(startDate.getTime());
var endTimestamp = Math.floor(endDate.getTime());

// date fields
const dateStart = document.querySelector('#date-start');
const dateEnd = document.querySelector('#date-end');
dateStart.value = startTimestamp;
dateEnd.value = endTimestamp;
*/



// Formulas Math
const pageTotal = document.querySelector('#bookform-total');
const pageDeposit = document.querySelector('#bookform-deposit');

var formulasData = {};
const options = document.getElementsByClassName('form_option');
for (element of options) {
    var childHelper = element.firstElementChild.firstElementChild;
    var optionXid = childHelper.getAttribute('data-xid');
    var unitInput = element.getElementsByClassName('form_option-count')[0];
    formulasData[optionXid] = 0;
    // bring back older version so we don't have to convert at bottom

    unitInput.addEventListener("input", function (e) {
        var unitCount = this.value;
        var unitCost = this.getAttribute('data-price');
        var unitXid = this.getAttribute('data-xid');
        formulasData[unitXid] = unitCount;
        var targetTotal = 'tot' + unitXid;
        var formulaTotal = document.getElementById(targetTotal);
        var optionTotal = (unitCost * unitCount).toFixed(2);
        formulaTotal.innerText = Number(optionTotal).toFixed(2);
        var sum = 0;
        var newTest = document.querySelectorAll(".form_option-total");
        for (element of newTest) {
            sum += Number(element.innerText);
        }
        pageTotal.innerText = sum.toFixed(2);
        pageDeposit.innerText = (sum / 2).toFixed(2);
        // Convert the object to an arrat & set it to input value
        var formulasDataArray = [];
        for (var key in formulasData) {
        formulasDataArray.push({ key: key, value: Number(formulasData[key]) });
        }
        var formulasDataArrayString = JSON.stringify(formulasDataArray);
        document.getElementById('formulas-array').value = formulasDataArrayString;
    });
};


/*
// date check form disable until filled out
document.getElementById('wf-form-Date-Validation').addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if all three fields are not blank
    var dateField = document.getElementById('check-booking-date').value.trim();
    var startField = document.getElementById('check-booking-time-start').value.trim();
    var endField = document.getElementById('check-booking-time-end').value.trim();

    if (dateField !== '' && startField !== '' && endField !== '') {
        // Dynamically set the form's action and method
        this.action = "https://hook.us1.make.com/4fa6tza7qsm9tfa8jhc2pkxlha1uak6i";
        this.method = "post";

        // Submit the form programmatically
        this.submit();
        console.log("Submitted");
    }
});
*/