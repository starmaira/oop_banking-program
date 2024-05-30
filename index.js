#!/usr/bin/env node 
import inquirer from "inquirer";
//bank Account Class//
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money//
    widthdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance is : $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance!!");
        }
    }
    //Credit money//
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than 100$ is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance is :$${this.balance}`);
    }
    //check balance//
    checkBalance() {
        console.log(`Current balance is :$${this.balance}`);
    }
}
//customer class//
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts//
const accounts = [
    new BankAccount(1001, 50000),
    new BankAccount(1002, 5000),
    new BankAccount(1003, 500)
];
//create customers//
const customers = [
    new customer("Maira", "Nasir", "Female", 26, 3161234567, accounts[0]),
    new customer("Sami", "Nasir", "Male", 20, 3111234567, accounts[1]),
    new customer("Shagufta", "Nasir", "Female", 46, 3101234567, accounts[2])
];
// function to interact with bank account//
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number please:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome,${customer.firstName} ${customer.lastName} !\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "withdraw",
                        "check Balance", "Exit"
                    ]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit :",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit :",
                    });
                    customer.account.widthdraw(withdrawAmount.amount);
                    break;
                case "check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program.............");
                    console.log("Thank You for Using Our Bank services , Have a Great Day!!!!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again!!");
        }
    } while (true);
}
service();
