console.log("latest-4.8.1");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;
var mainForm = document.querySelector('#main-form-wrap');

var bookingGid = urlParams.get('booking-gid');
console.log(bookingGid);
console.log(URLSearchParams);

// Form Prefill Testing
mainForm.classList.add('hidden');
document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people").value = 20;

if (fullHash.includes('approved')) {
    document.querySelector('#main-form-veil').classList.remove('is-visible');
    document.querySelector('#date-validation-form').remove();
    document.querySelector('#date-confirmation-wrap').classList.add('is-visible');
    mainForm.classList.remove('hidden');
} else {
    document.querySelector('#main-form-veil').classList.add('is-visible');
};

if (fullHash.includes('denied')) {
    document.querySelector('#bookform-denied').classList.add('is-visible');
};

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

console.log(startDate, endDate);
// Format dates as strings
var startTimestamp = Math.floor(startDate.getTime() / 1000);
var endTimestamp = Math.floor(endDate.getTime() / 1000);

// date fields
const dateStart = document.querySelector('#date-start');
const dateEnd = document.querySelector('#date-end');
//const eventGid = document.querySelector('#c-booking-gid');

dateStart.value = startTimestamp;
dateEnd.value = endTimestamp;
//eventGid.value = bookingGid;
//console.log(bookingGid);


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
        var optionTotal = unitCost * unitCount;
        formulaTotal.innerText = optionTotal;
        var sum = 0;
        $('.form_option-total').each(function () {
            sum += Number($(this).text());
        });
        pageTotal.innerText = sum;
        pageDeposit.innerText = sum / 2;

        // Convert the object to an arrat & set it to input value
        var formulasDataArray = [];
        for (var key in formulasData) {
        formulasDataArray.push({ key: key, value: formulasData[key] });
        }
        var formulasDataArrayString = JSON.stringify(formulasDataArray);
        document.getElementById('formulas-array').value = formulasDataArrayString;
    });
};