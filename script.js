
window.addEventListener("load", function () {

let taxOwed;

function calculateInterest(isIsa, balance, interestRate, taxStatus) {

    let allowance;
    let taxRate;
    taxOwed = 0;

    // Establish tax status rules
    if (taxStatus === "basic") {
        allowance = 1000;
        taxRate = 0.20;
    }
    if (taxStatus === "higher") {
        allowance = 500;
        taxRate = 0.40;
    }
    if (taxStatus === "additional") {
        allowance = 0;
        taxRate = 0.45;
    }


    if (isIsa) {
        return balance * interestRate;
    }

    //If not an ISA, check if interest exceeds allowance to see if tax is owed
    if (!isIsa && balance * interestRate <= allowance) {
        return balance * interestRate;
    }
    if (!isIsa && balance * interestRate > allowance) {
        let interest = balance * interestRate;
        let taxableInterest = interest - allowance;
        taxOwed = taxableInterest * taxRate;
        return interest - taxOwed;
    }
}

document.addEventListener("submit", function (event) {

    let isaBalance = document.querySelector("input[name=isaBalance]").value;
    let isaInterestRate = document.querySelector("input[name=isaRate]").value / 100;
    
    let balance = document.querySelector("input[name=balance]").value;
    let interestRate = document.querySelector("input[name=rate]").value / 100;

    let taxStatus = document.querySelector("select[name=taxStatus]").value;

    let isaResult = calculateInterest(true, isaBalance, isaInterestRate, taxStatus);
    document.getElementById("isaResult").innerHTML = 
    `With £${isaBalance} in an ISA at ${Math.round(isaInterestRate * 10000) / 100}%, you keep £${isaResult.toFixed(2)} and owe £${taxOwed}`;
    
    let nonIsaResult = calculateInterest(false, balance, interestRate, taxStatus);
    document.getElementById("nonIsaResult").innerHTML = 
    `With £${balance} in a non ISA at ${Math.round(interestRate * 10000) / 100}%, you keep £${nonIsaResult.toFixed(2)} and owe £${taxOwed.toFixed(2)}`;


    event.preventDefault();
})

})