console.log("latest-4.9.1");

// Hide booking form - to leave it visible in designer
//document.querySelector('#main-form-wrap').classList.add('is-hidden');

// Formulas Math
var formulasData = {};
const pageTotal = document.querySelector('#bookform-total');
const pageDeposit = document.querySelector('#bookform-deposit');
const options = document.getElementsByClassName('form_option');

for (element of options) {
    var childHelper = element.firstElementChild.firstElementChild;
    var optionXid = childHelper.getAttribute('data-xid');
    var unitInput = element.getElementsByClassName('form_option-count')[0];
    formulasData[optionXid] = 0;
    // bring back older version so we don't have to convert at bottom ?

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

// Confirmation window - redirect from stripe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const loader = document.querySelector("#loader");
var fullHash = window.location.hash;

let mainSection = document.querySelector("#bookform-content");
let successSection = document.querySelector("#bookform-successful");

if (fullHash.includes('successful')) {
    mainSection.classList.add('is-hidden');
    successSection.classList.add('is-visible');
} else {
    successSection.classList.remove('is-visible');
    mainSection.classList.remove('is-hidden');
};

loader.classList.add("is-hidden");


/*

// Function to be executed when the timer expires
function bookingExpired() {
  console.log("Timer expired! 10 minutes have passed.");
}
// Call function after delay has expired
setTimeout(bookingExpired,6000);

*/