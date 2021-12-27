# MyBudget API Client
This library is the the wrapper client for MyBudget API for lastest browsers and Node.js
## Installation
```
yarn add mybudget
```
```
npm install mybudget
```
## Usage
```javascript
import MyBudget from 'mybudget'

const mb = MyBudget()

// List Wallets
const wallets = await mb.wallets.list()

// Create Wallet
const wallets = await mb.wallets.create({
    currency: 'USD', // One of allowed currencies
    inititalBalance: 100000 // Wallet will be created with that amount.
})

// Add Income
const wallets = await mb.incomes.add({
      walletId, // Income will be added to wallet specified with the id.
      categoryId, // Income Category Id. You will learn how to get categories from sections below.
      amount,
      transactionDate // Optional. Date when transaction was made
})

// List all incomes
const wallets = await mb.incomes.list()

// Add Expense
const wallets = await mb.expenses.add({
      walletId, // Expense will be added to wallet specified with the id.
      categoryId, // Expense Category Id. You will learn how to get categories from sections below.
      amount,
      transactionDate // Optional. Date when transaction was made
})

// List all expenses
const wallets = await mb.expenses.list()

// Get all Income Categories
const incomeCategories = await mb.incomeCategories.list()

// Get all Expense Categories
const expenseCategories = await mb.expenseCategories.list()

// Get Dashboard
const dashboard = await mb.dashboard.get()

```

# Money Unit
We represent money (amount, balance etc.) in cent/penny unit. Ex. 100000 = $1000.00

# Allowed currencies
USD, GBP, PLN, EUR, CHF