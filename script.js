//declare variables to hold global values
let bankBalance = 0; 
let payBalance = 0; 
let loanBalance = 0; 
let loan = false; 
let laptops = []; 

//declare HTML-elements for cleaner code 
const balanceElement = document.getElementById("balance");
const payElement = document.getElementById("pay");
const laptopsElement = document.getElementById("laptopSelecter"); 
const lapTopTitle = document.getElementById("lapTopTitle"); 
const lapTopDescription = document.getElementById("lapTopDescription"); 
const lapTopPrice = document.getElementById("lapTopPrice"); 
const loanButton = document.getElementById("loanButton"); 
const bankButton = document.getElementById("bankButton");
const workButton = document.getElementById("workButton");
const buyButton = document.getElementById("buyButton");

//add event-listeners
workButton.addEventListener("click", doWork);
 

function checkLoan() {

}

function transferToBank() {

}

function doWork() {
    payBalance += 100; 
    payElement.innerText = payBalance; 
}

function buyLaptop() {

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
    //laptopElement.appendChild(document.createTextNode(laptop.description)); 
    laptopElement.appendChild(document.createTextNode(laptop.title)); 
    laptopsElement.appendChild(laptopElement); 
    console.log(laptop); 
}

const handleLaptopSelectChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex - 1]; 
    lapTopPrice.innerText = selectedLaptop.price; 
    lapTopDescription.innerText = selectedLaptop.description; 
    lapTopTitle.innerText = selectedLaptop.title; 
}

laptopsElement.addEventListener("change", handleLaptopSelectChange); 