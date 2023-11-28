console.log("latest-3");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;
var mainForm = document.querySelector('#main-form-wrap');
var sumUp = {};

// Form Prefill Testing
mainForm.classList.add('hidden');
document.getElementById("bookform-contact").value = "Pierre";
document.getElementById("bookform-company").value = "Company";
document.getElementById("bookform-email").value = "pierre@email.com";
document.getElementById("bookform-people-2").value = 20;


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
    // Check if the element & target exists
    var element = document.getElementById(p[0]);
    if (element) { element.value = decoded; }
    var targetElement = document.getElementById(target);
    if (targetElement) { targetElement.innerText = decoded; }
};

const pageTotal = document.querySelector('#bookform-total');
const pageDeposit = document.querySelector('#bookform-deposit');

var formulasData = [];
const options = document.getElementsByClassName('form_option');
for (element of options) {
    var childHelper = element.firstElementChild.firstElementChild;
    var optionCost = childHelper.getAttribute('data-price');
    var optionXid = childHelper.getAttribute('data-xid');
    var unitInput = element.getElementsByClassName('form_option-count')[0];
    formulasData.push({ xid: optionXid, count: 0 });
    unitInput.addEventListener("input", function (e) {
        var unitCount = this.value;
        var unitCost = this.getAttribute('data-price');
        var unitXid = this.getAttribute('data-xid');
        // Update the formulasData array based on the input change
        var formulaDataIndex = formulasData.findIndex(data => data.xid === unitXid);
        if (formulaDataIndex !== -1) {
            formulasData[formulaDataIndex].count = unitCount;
        }
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
        console.log(formulasData);
    });
};
/*

// Form Math on Page
var form = document.getElementById('wf-form-Booking-Form');
form.preventDefault();

// Add an event listener to the form's submit event
form.addEventListener('submit', function(event) {
    // Call the extractAndSubmit function
    extractAndSubmit();
});

function extractAndSubmit() {
    
    // Create an object to store form data
    

    // Loop through all form elements
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];

        // Check if the element has a name and is not a submit button
        if (element.name && element.type !== 'submit') {
            // Add the element's value to the sumUp object
            sumUp[element.name] = element.value;
        }
    }

    // Extract formulas data
    var formulasData = [];
    for (var key in sumUp) {
        if (key.startsWith("formulas")) {
            var parts = key.split('[');
            var xid = parts[1].split(']')[0];
            var count = sumUp[key];
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
*/