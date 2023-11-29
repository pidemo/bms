console.log("latest-4.8.6.5");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;
var mainForm = document.querySelector('#main-form-wrap');

let mainSection = document.querySelector("#bookform-content");
let successSection = document.querySelector("#bookform-successful");
let mainFormVeil = document.querySelector('#main-form-veil');
let dateForm = document.querySelector('#date-validation-form');
let dateConfirmation = document.querySelector('#date-confirmation-wrap');
let dateDenied = document.querySelector('#bookform-denied');

mainForm.classList.add('is-hidden');

if (fullHash.includes('approved')) {
    console.log("approved");
    mainFormVeil.classList.remove('is-visible');
    dateForm.remove();
    dateConfirmation.classList.add('is-visible');
    mainForm.classList.remove('hidden');
} else {
    console.log("not approved");
    mainFormVeil.classList.add('is-visible');
};

if (fullHash.includes('denied')) {
    console.log("denied");
    dateDenied.classList.add('is-visible');
};
if (fullHash.includes('successful')) {
    console.log("successful");
    mainSection.classList.add('is-hidden');
    successSection.classList.add('is-visible');
} else {
    console.log("not-successful");
    successSection.classList.remove('is-visible');
    mainSection.classList.remove('is-hidden');
};

/* Form Prefill Testing
document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people").value = 20;
*/

//form prefill based on URL params :
var hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
for (var i = 0; i < hashParams.length; i++) {
    var p = hashParams[i].split('=');
    var prefix = 'c-';
    var target = prefix.concat(p[0]);
    var decoded = decodeURIComponent(p[1]);
    // Check if the element & target exists
    var element = document.getElementById(p[0]);
    if (element) { element.value = decoded; }
    var targetElement = document.getElementById(target);
    if (targetElement) { targetElement.innerText = decoded; }
};

const pageTotal = document.querySelector('#bookform-total');
const pageDeposit = document.querySelector('#bookform-deposit');

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

console.log("Step 1 :", startDate, endDate);

// Format dates as strings
var startTimestamp = Math.floor(startDate.getTime());
var endTimestamp = Math.floor(endDate.getTime());

// date fields
const dateStart = document.querySelector('#date-start');
const dateEnd = document.querySelector('#date-end');

dateStart.value = startTimestamp;
dateEnd.value = endTimestamp;

console.log("Step 2 :", startTimestamp, endTimestamp);

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
        console.log(unitCount + " : " + optionTotal);
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