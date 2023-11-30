// Form Prefill Testing
document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people").value = 20;


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

// set date fields
let dateStart = document.querySelector('#date-start');
let dateEnd = document.querySelector('#date-end');
dateStart.value = startTimestamp;
dateEnd.value = endTimestamp;




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