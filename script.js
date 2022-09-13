/**
 * 
 * Komputer Store: a Dynamic Webpage using vanilla JS
 * This webpage models a bank, a worker and a list of laptops be bought.
 * @author Sondre Mæhre September 2022
 * 
 * TODO: 
 * Styling:  
 *  - Responsiveness? 
 * Readme
 * Deploy Heroku?
 */

//declare variables to hold global values
let bankBalance = 0; 
let payBalance = 0; 
let loanBalance = 0; 
let activeLoan = false; 
let laptops = []; 
const baseUrl = "https://noroff-komputer-store-api.herokuapp.com/";  

//declare HTML-elements for cleaner code 
const balanceElement = document.getElementById("balance");
const payElement = document.getElementById("pay");
const loanElement = document.getElementById("loanBalance"); 
const featuresElement = document.getElementById("features"); 
const laptopsElement = document.getElementById("laptopSelecter"); 
const lapTopTitle = document.getElementById("lapTopTitle"); 
const lapTopDescription = document.getElementById("lapTopDescription"); 
const lapTopPrice = document.getElementById("lapTopPrice"); 
const lapTopFeatures = document.getElementById("lapTopFeatures"); 
const loanButton = document.getElementById("loanButton"); 
const bankButton = document.getElementById("bankButton");
const workButton = document.getElementById("workButton");
const buyButton = document.getElementById("buyButton");
const repayButton = document.getElementById("repayButton"); 
const lapTopImage = document.getElementById("lapTopImage"); 
const outstandingLoan = document.getElementById("outstandingLoan"); 
const secondSection = document.getElementById("second-section"); 

/**
 * Method to format the currency of any balance 
 * @param {*} number the number to be formatted
 * @returns number with the correct format and currency
 */
const formatCurrency = number => 
    new Intl.NumberFormat('de-DE', {style:'currency', currency:'NOK'})
    .format(number);

/**
 * This method fetches all the computers from API
 */
const getComputers = async () => {
    try {
        const response = await fetch(baseUrl+"computers"); 
        const post = await response.json(); 
        laptops = post; 
        addLaptopsToList(laptops); 
    } catch (error) {
        console.error(error); 
    }
}

//set-up start screen, initializing all required values
getComputers(); 
outstandingLoan.style.visibility = "hidden"; 
repayButton.style.visibility = "hidden"; 
secondSection.style.visibility = "hidden"; 
lapTopFeatures.style.visibility = "hidden"; 
balanceElement.innerText = formatCurrency(bankBalance); 
payElement.innerText = formatCurrency(payBalance); 

/**
 * This method adds all fetched laptops to the dropdown menu
 * @param {*} laptops array of laptops to be listed
 */
const addLaptopsToList = (laptops) => laptops.forEach( x => addLaptopToList(x)); 

/**
 * This method add the specific laptop to the dropdown menu
 * @param {*} laptop specific laptop to be added to list
 */
const addLaptopToList = (laptop) => {
    const laptopElement = document.createElement("option"); 
    laptopElement.value = laptop.id; 
    laptopElement.appendChild(document.createTextNode(laptop.title)); 
    laptopsElement.appendChild(laptopElement); 
}

/**
 * This method handles interaction when user changes the selected
 * laptop from the dropdown menu. Updated all relevant fields on UI.
 */
const handleLaptopSelectChange = () => {
    secondSection.style.visibility = "visible"; 
    lapTopFeatures.style.visibility = "visible"; 
    const selectedLaptop = laptops[laptopsElement.selectedIndex - 1]; 
    lapTopPrice.innerText = formatCurrency(selectedLaptop.price); 
    lapTopTitle.innerText = selectedLaptop.title;
    lapTopDescription.innerText = selectedLaptop.description; 
    lapTopImage.src = baseUrl.concat(selectedLaptop.image); 
    replaceFeatures(selectedLaptop.specs);  
}

/**
 * This method updated the features UI-element for the selected
 * laptop. 
 * @param {*} features to be updated in UI
 */
const replaceFeatures = (features) => {
    featuresElement.replaceChildren(); 
    features.forEach( x => {
        const node = document.createElement('li');
        node.appendChild(document.createTextNode(x));
        featuresElement.appendChild(node);
    })
}

/**
 * This method adds 100 to the payBalance when user clicks on 
 * the "Work" button. 
 */
const doWork = () => {
    payBalance += 100; 
    payElement.innerText = formatCurrency(payBalance); 
}

/**
 * This method transfers the payBalance to bankBalance. 
 * Checks if the users has an active loan, if so:
 * 10% of the payBalance is deducted and paid on the loan. 
 * The rest is added to bankBalance. 
 * If not: total payBalance is transferred to bankBalance. 
 */
const transferToBank = () => {
    if (activeLoan) {
        const amountToLoanBalance = payBalance*0.10; 
        if (loanBalance <= amountToLoanBalance) {
            loanPaidBack(amountToLoanBalance); 
        } else {
            loanBalance -= amountToLoanBalance; 
            loanElement.innerText = formatCurrency(loanBalance); 
        }
        bankBalance += payBalance-amountToLoanBalance;  
    } else {
        bankBalance += payBalance; 
    }
    payBalance = 0; 
    payElement.innerText = formatCurrency(payBalance); 
    balanceElement.innerText = formatCurrency(bankBalance);  
}

/**
 * This method handles the actions required when user clicks 
 * on the "Get a loan" button. Check if the user already has an active 
 * loan. Then checks if the amount entered is valid and not greater than 
 * 2 times the bankBalance. If all good: create loan. Enable info about
 * loan in bank and "Repay loan" button in "Work" section.
 */
const handleGetLoan = () => {
    if (activeLoan) {
        alert("You can only have one loan. Repay your current loan first"); 
        return; 
    }

    const wantedLoan = prompt("Please enter the amount you wish to loan"); 
    if (parseInt(wantedLoan) > bankBalance*2) {
        alert("You cannot loan more than double of your bank balance!"); 
        return; 
    }

    if (!isNaN(wantedLoan) && wantedLoan != null) {
        alert("Congratulations! You got a loan!"); 
        loanBalance = parseInt(wantedLoan);  
        loanElement.innerText = formatCurrency(loanBalance); 
        activeLoan = true; 
        outstandingLoan.style.visibility = "visible"; 
        repayButton.style.visibility = "visible"; 
    }
}

/**
 * This method handles the actions required when user clicks
 * on the "Repay Loan" button. Handles if the loan will be 
 * paid back in total or not. 
 */
const handleRepay = () => {
    if (loanBalance <= payBalance) {
        loanPaidBack(payBalance); 
    } else {
        loanBalance -= payBalance; 
        loanElement.innerText = formatCurrency(loanBalance); 
    }
    payBalance = 0; 
    payElement.innerText = formatCurrency(payBalance); 
}

/**
 * This method is called when the loan is going to be paid back
 * during next transaction. Gives user feedback and resets all 
 * parameters for loan. Disabling loan info in bank and "Repay Loan"
 * button. 
 * @param {*} payBack The amount which is going to be paid back on loan. 
 */
const loanPaidBack = (payBack) => {
    const toBankBalance = payBack - loanBalance; 
    loanBalance = 0; 
    loanElement.innerText = formatCurrency(0), 
    bankBalance += toBankBalance; 
    balanceElement.innerText = formatCurrency(bankBalance); 
    outstandingLoan.style.visibility = "hidden"; 
    repayButton.style.visibility = "hidden";  
    activeLoan = false; 
    alert("Congratulations! You have now repaid your loan!"); 
}

/**
 * This method handles required actions when user clicks on
 * the "Buy" button. Check whether user can buy the laptop or not. 
 */
const handleBuyLaptop = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex - 1];
    if (bankBalance > parseInt(selectedLaptop.price)) {
        alert("Congratulations! You are now the owner of the new laptop"); 
        bankBalance -= parseInt(selectedLaptop.price); 
        balanceElement.innerText = formatCurrency(bankBalance); 
    } else {
        alert("Sorry, you cannot afford the laptop at the moment.");
    }
}

//add all event-listeners
workButton.addEventListener("click", doWork);
bankButton.addEventListener("click", transferToBank); 
laptopsElement.addEventListener("change", handleLaptopSelectChange); 
loanButton.addEventListener("click", handleGetLoan); 
buyButton.addEventListener("click", handleBuyLaptop); 
repayButton.addEventListener("click", handleRepay); 
lapTopImage.addEventListener("error", function(event) {
    event.target.src = "notfound.jfif";
    event.onerror = null;
  });