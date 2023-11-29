console.log("latest-4.8.6");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;
var mainForm = document.querySelector('#main-form-wrap');

// Form Prefill Testing
mainForm.classList.add('hidden');
document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people").value = 20;
document.querySelector("#resto-xid").value = 58;

document.querySelector('#main-form-veil').classList.remove('is-visible');
document.querySelector('#date-validation-form').remove();
document.querySelector('#date-confirmation-wrap').classList.add('is-visible');
mainForm.classList.remove('hidden');

var request = document.getElementById("c-request"); 
var bookingDate = document.getElementById("c-booking-date");
var bookingTime = document.getElementById("c-booking-time");
var bookingEnd = document.getElementById("c-booking-time-end");
var bookingGid = document.getElementById("c-booking-gid");

if (request) {request.innerText = "approved";}
if (bookingDate) {bookingDate.innerText = "2023-12-19";}
if (bookingTime) {bookingTime.innerText = "06:00 PM";}
if (bookingEnd) {bookingEnd.innerText = "09:00 PM";}
if (bookingGid) {bookingGid.innerText = "55u0eit8om5tqgt2guepuqls0s";}

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