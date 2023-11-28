console.log("latest-4.4");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var fullHash = window.location.hash;
var mainForm = document.querySelector('#main-form-wrap');

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

var formulasData = {};
const options = document.getElementsByClassName('form_option');
for (element of options) {
    var childHelper = element.firstElementChild.firstElementChild;
    var optionXid = childHelper.getAttribute('data-xid');
    var unitInput = element.getElementsByClassName('form_option-count')[0];
    formulasData[optionXid] = 0;

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
        // Convert the object to a JSON string & set it to input value
        var formulasDataString = JSON.stringify(formulasData);
        document.getElementById('formulas-sumup-string').value = formulasDataString;

        // Convert the object to an arrat & set it to input value
        var formulasDataArray = [];
        for (var key in formulasData) {
        formulasDataArray.push({ key: key, value: formulasData[key] });
        }
        document.getElementById('formulas-sumup-array').value = formulasDataArray;
        var formulasDataArrayString = JSON.stringify(formulasDataArray);
        document.getElementById('formulas-sumup-array-string').value = formulasDataArrayString;
    });
};