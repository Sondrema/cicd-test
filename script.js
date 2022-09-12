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
const loanButton = document.getElementById("loanButton"); 
const bankButton = document.getElementById("bankButton");
const workButton = document.getElementById("workButton");
const buyButton = document.getElementById("buyButton");
const repayButton = document.getElementById("repayButton"); 
const lapTopImage = document.getElementById("lapTopImage"); 
const outstandingLoan = document.getElementById("outstandingLoan")

//set-up start screen
outstandingLoan.style.visibility = "hidden"; 
repayButton.style.visibility = "hidden"; 
balanceElement.innerText = bankBalance; 
payElement.innerText = payBalance; 

//add event-listeners
workButton.addEventListener("click", doWork);
bankButton.addEventListener("click", transferToBank); 
 
function loanPaidBack(payBack) {
    const part = payBack - loanBalance; 
    loanBalance = 0; 
    loanElement.innerText = 0, 
    outstandingLoan.style.visibility = "invisible"; 
    bankBalance += part; 
    balanceElement.innerText = bankBalance; 
    activeLoan = false; 
    outstandingLoan.style.visibility = "hidden"; 
    repayButton.style.visibility = "hidden";  
    alert("Congratulations! You have now repaid your loan!"); 
}

function transferToBank() {
    if (activeLoan) {
        const part = payBalance*0.10; 
        if (loanBalance <= part) {
            loanPaidBack(part); 
        } else {
            loanBalance -= part; 
            loanElement.innerText = loanBalance; 
        }
        bankBalance += payBalance-part;  
    } else {
        bankBalance += payBalance; 
    }
    payBalance = 0; 
    payElement.innerText = payBalance; 
    balanceElement.innerText = bankBalance;  
}

function doWork() {
    payBalance += 100; 
    payElement.innerText = payBalance; 
}


//fetch api 
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToList(laptops)); 

const addLaptopsToList = (laptops) => {
    laptops.forEach( x => addLaptopToList(x)); 
}

const addLaptopToList = (laptop) => {
    const laptopElement = document.createElement("option"); 
    laptopElement.value = laptop.id; 
    laptopElement.appendChild(document.createTextNode(laptop.title)); 
    laptopsElement.appendChild(laptopElement); 
}

const handleLaptopSelectChange = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex - 1]; 
    lapTopPrice.innerText = selectedLaptop.price; 
    lapTopDescription.innerText = selectedLaptop.description; 
    lapTopTitle.innerText = selectedLaptop.title;
    lapTopImage.src = baseUrl.concat(selectedLaptop.image); 
    const features = selectedLaptop.specs; 
    featuresElement.replaceChildren(); 
    features.forEach( x => {
        const node = document.createElement('li');
        node.appendChild(document.createTextNode(x));
        featuresElement.appendChild(node);
    })
}

laptopsElement.addEventListener("change", handleLaptopSelectChange); 

const handleGetLoan = () => {
    
    if (activeLoan) {
        alert("You can only have one loan. Repay your current loan first"); 
        return; 
    }

    const wantedLoan = prompt("Please enter the amount you wish to loan"); 
    console.log(wantedLoan); 
    if (parseInt(wantedLoan) > bankBalance*2) {
        alert("You cannot loan more than double of your bank balance!"); 
        return; 
    }

    if (!isNaN(wantedLoan) && wantedLoan != null) {
        alert("Congratulations! You got a loan!"); 
        loanBalance = parseInt(wantedLoan);  
        loanElement.innerText = loanBalance; 
        activeLoan = true; 
        outstandingLoan.style.visibility = "visible"; 
        repayButton.style.visibility = "visible"; 
    }
}

loanButton.addEventListener("click", handleGetLoan); 

const handleBuyLaptop = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex - 1];
    if (bankBalance > parseInt(selectedLaptop.price)) {
        alert("Congratulations! You are now the owner of the new laptop"); 
        bankBalance -= parseInt(selectedLaptop.price); 
        balanceElement.innerText = bankBalance; 
    } else {
        alert("Sorry, you cannot afford the laptop at the moment.");
    }
}

buyButton.addEventListener("click", handleBuyLaptop); 

const handleRepay = () => {
    if (loanBalance <= payBalance) {
        loanPaidBack(payBalance); 
    } else {
        loanBalance -= payBalance; 
        loanElement.innerText = loanBalance; 
    }
    payBalance = 0; 
    payElement.innerText = payBalance; 
}

repayButton.addEventListener("click", handleRepay); 