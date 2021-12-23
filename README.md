# MyBudget API Client
This library is the the wrapper client for MyBudget API (@TODO: Paste API Address) for lastest browsers and Node.js. It needs an MyBudget API key to be configured.
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

const myBudgetApiKey = 'xyz-...-123'
const mb = MyBudget(myBudgetApiKey)

async function addIncome() {
    try {
        const amountInPennies = 30000
        await mb.income.add('earn', amountInPennies)
        await mb.income.add('dividend', amountInPennies)
    } catch (e) {
        // Error occured while adding income
    }

}

async function addExpense() {
    try {
        const amountInPennies = 10000
        await mb.expense.add('house', amountInPennies)
        await mb.expense.add('food', amountInPennies)
    } catch (e) {
        // Error occured while adding expense
    }

}

async function getWallet() {
    try {
        const wallet = await mb.wallet.getByCurrency('PLN')

        /*
            wallet = {
                balance: 20000,
                currency: 'PLN'
            }

        */
    } catch (e) {
        // Error occured while getting wallet
    }

}

```