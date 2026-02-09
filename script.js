
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


document.addEventListener("submit", function (event) {

    console.log("submitted");

    event.preventDefault();
})

})