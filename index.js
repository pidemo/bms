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
    let prefix = 'full';
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
        console.log(unitCost, unitXid);
        var targetId = prefix.concat(unitXid);
        var targetTotal = pretot.concat(unitXid);
        var fullString = unitCount.concat(unitXid);
        let targetField = this.nextElementSibling;
        var formulaTotal = document.getElementById(targetTotal);
        console.log("input");
        targetField.value = fullString;
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