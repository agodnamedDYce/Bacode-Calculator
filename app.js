// Step 1: Grab necessary elements
const loanAmountInput = document.getElementById('loan-amount');
const interestRateInput = document.getElementById('interest-rate');
const repayTimeInput = document.getElementById('repay-time');
const calculateButton = document.querySelector('.calculate');
const errorMessage = document.getElementById('error-message');
const throbber = document.getElementById('throbber');
const repaymentPlan = document.getElementById('repayment-plan');
const monthlyPaymentOutput = document.getElementById('monthly-payment');
const totalPaymentOutput = document.getElementById('total-payment');
const totalInterestOutput = document.getElementById('total-interest');

// Initially hide the error message and repayment plan section
errorMessage.style.display = 'none';
throbber.style.display = 'none';
repaymentPlan.style.display = 'none';

// Step 2: Add event listener to calculate button
calculateButton.addEventListener('click', function () {
    // Reset any previous error messages and hide repayment plan if there was an error
    errorMessage.style.display = 'none';
    repaymentPlan.style.display = 'none';  // Hide the repayment section if error is triggered

    // Get the values from the input fields
    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const repayTime = parseInt(repayTimeInput.value);

    // Validate the input
    if (isNaN(loanAmount) || loanAmount <= 0 || isNaN(interestRate) || interestRate <= 0 || isNaN(repayTime) || repayTime <= 0) {
        // Show the error message
        errorMessage.style.display = 'block';  

        // Hide the error message after 2 seconds
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 2000);

        return;
    }

    // If valid, show the throbber and start calculations
    throbber.style.display = 'block';
    repaymentPlan.style.display = 'none';  // Hide results while calculating

    // Simulate a delay for the throbber effect (e.g., 1 second delay)
    setTimeout(function () {
        throbber.style.display = 'none';  // Hide throbber after "calculations"
        calculateLoan(loanAmount, interestRate, repayTime);  // Perform loan calculations
    }, 1000);
});

// Step 3: Calculate loan details
function calculateLoan(loanAmount, interestRate, repayTime) {
    // Convert annual interest rate to monthly and years to months
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = repayTime * 12;

    // Monthly Payment Formula
    const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), totalMonths) /
        (Math.pow((1 + monthlyInterestRate), totalMonths) - 1);

    // Total Payment
    const totalPayment = monthlyPayment * totalMonths;

    // Total Interest
    const totalInterest = totalPayment - loanAmount;

    // Display the results
    monthlyPaymentOutput.value = monthlyPayment.toFixed(2);
    totalPaymentOutput.value = totalPayment.toFixed(2);
    totalInterestOutput.value = totalInterest.toFixed(2);

    // Show the repayment plan section
    repaymentPlan.style.display = 'block';
}
