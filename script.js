
window.addEventListener("load", function () {


function calculateInterest(isIsa, balance, interestRate, taxStatus) {

    let allowance;
    let taxRate;

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
        return interest - (taxableInterest * taxRate);
    }
}

calculateInterest(false, 20000, 0.06, "basic");

document.addEventListener("submit", function (event) {

    
    let balance = Number(document.querySelector("input[name=balance]").value);
    let interestRate = Number(document.querySelector("input[name=rate]").value) / 100;
    let taxStatus = document.querySelector("select[name=taxStatus]").value;

    document.getElementById("isaResult").innerHTML = 
    "With an ISA you keep: £" + calculateInterest(true, balance, interestRate, taxStatus)
    document.getElementById("nonIsaResult").innerHTML = 
    "With a non ISA you keep: £" + calculateInterest(false, balance, interestRate, taxStatus)

    event.preventDefault();
})

})