# Komputer Store

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![pipeline status](https://gitlab.com/NicholasLennox/gradle-ci/badges/master/pipeline.svg)](https://gitlab.com/sondrem/komputer-store/-/commits/master)

A dynamic webpage using “vanilla” JavaScript, CSS & HTML. 

## Table of Contents

- [About](#about)
- [Install](#install)
- [Usage](#usage)
- [Integration](#Integration)
- [Built with](#built-with)
- [Contributing](#contributing)
- [License](#license)

## About
This project is to practice the use of plain Javascript to create a dynamic webpage. 
It models the following: 

- The Bank – an area where the user can store funds and make bank loans
- Work – an area to increase earnings and deposit cash into the bank balance
- Laptops – an area to select and display information about the merchandise

### The Bank
The bank shows a “Bank” balance in NOK. This is the amount available for the user to buy a laptop. It also shows an outstanding loan (only visible after taking a loan). 
Shows the outstanding Loan value. This is reduced as loan paid back. 

### Work
The pay or current salary amount in NOK. Shows how much money the user have earned by
“working”. This money is NOT part of the bank balance. Contains three buttons: 
- Bank Button: transfers the money from the Pay/Salary balance to the Bank balance
- Work Button: increases the pay balance at a rate of 100 on each click
- Repay Loan Button: only visible when an active loan. The full amount on pay balance
will be transferred and deducted from the loan. 

### Laptops
A dropdown menu shows available laptops from a given API. 
Information about the selected laptop is shown. Contains a button called "Buy". 
- If the user has enough money to by the laptop, the purchase is done and subtracted from the users bank account.

## Install
Clone repository

## Usage
Use the Live Server VS add-on to run program. 


## Built with

- Visual Studio Code
- JavaScript
- CSS
- HTML5
- Live Server Add-on
- Google Chrome Developer tools
- Git

## Contributing
- [Sondre Mæhre](https://gitlab.com/sondrem)

PRs accepted.

## License

UNLICENSED