console.log("loaded");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;
var mainForm = document.querySelector('#main-form-wrap');
mainForm.classList.add('hidden');

if (
    //fullHash.includes('approved')
    1 === 1
) {
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
    /*
    console.log(target, decoded);
    document.getElementById(p[0]).value = decoded;
    document.getElementById(target).innerText = decoded;
    */
    // Check if the element & target exists
    var element = document.getElementById(p[0]);
    if (element) { element.value = decoded; }
    var targetElement = document.getElementById(target);
    if (targetElement) { targetElement.innerText = decoded; }

};

const pageTotal = document.querySelector('#bookform-total');
const pageDeposit = document.querySelector('#bookform-deposit');

//var totalFunc = function () {
//var formTotals = document.getElementsByClassName('form_option-total');
//};

const options = document.getElementsByClassName('form_option');
for (element of options) {
    //let prefix = 'full';
    let pretot = 'tot';

    let pageTotal = document.getElementById('bookform-total');
    let pageDeposit = document.getElementById('bookform-deposit');
    var childHelper = element.firstElementChild.firstElementChild;
    var optionCost = childHelper.getAttribute('data-price');
    var optionXid = childHelper.getAttribute('data-xid');
    var unitInput = element.getElementsByClassName('form_option-count')[0];
    unitInput.addEventListener("input", function (e) {
        var unitCount = this.value;
        var unitCost = this.getAttribute('data-price');
        var unitXid = this.getAttribute('data-xid');
        var targetTotal = pretot.concat(unitXid);
        
        // to delete 
        //var targetId = prefix.concat(unitXid);
        //var fullString = unitCount.concat(unitXid);var fullString = unitCount.concat(unitXid);
        //let targetField = this.nextElementSibling;
        //targetField.value = fullString;
        var formulaTotal = document.getElementById(targetTotal);
        console.log("input");
        var optionTotal = unitCost * unitCount;
        formulaTotal.innerText = optionTotal;
        var sum = 0;
        $('.form_option-total').each(function () {
            sum += Number($(this).text());
        });
        pageTotal.innerText = sum;
        pageDeposit.innerText = sum / 2;
        //console.log(sum);
    });
};

// Form Prefill Testing

document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people-2").value = 20;



// Form Math on Page

// Add an event listener to the form's submit event
document.getElementById('wf-form-Booking-Form').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Call the extractAndSubmit function
    extractAndSubmit();
});

function extractAndSubmit() {
    // Get the form with the id "myForm"
    var form = document.getElementById('wf-form-Booking-Form');

    // Create an object to store form data
    var formData = {};

    // Loop through all form elements
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];

        // Check if the element has a name and is not a submit button
        if (element.name && element.type !== 'submit') {
            // Add the element's value to the formData object
            formData[element.name] = element.value;
        }
    }

    // Extract formulas data
    var formulasData = [];
    for (var key in formData) {
        if (key.startsWith("formulas")) {
            var parts = key.split('[');
            var xid = parts[1].split(']')[0];
            var count = formData[key];
            formulasData.push({ xid: xid, count: count });
        }
    }

    // Convert the array to a JSON string
    var formulasDataString = JSON.stringify(formulasData);

    // Set the value of the hidden input field
    document.getElementById('formulasData').value = formulasDataString;
    console.log(formulasDataString);

    // You can include additional logic here if needed

    // Submit the form programmatically
    //form.submit();
}