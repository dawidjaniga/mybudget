import axios from 'axios'

import wallets from './wallets'
import incomes from './incomes'
import incomeCategories from './incomeCategories'
import expenses from './expenses'
import expenseCategories from './expenseCategories'
import dashboard from './dashboard'

export function MyBudget () {
  const apiClient = axios.create({
    // baseURL: process.env.API_URL,
    // @TODO: replace with inline process env replacer
    baseURL: 'https://api-mybudget.herokuapp.com/api',
    headers: {
      'content-type': 'application/json'
    }
  })

  return {
    wallets: wallets(apiClient),
    incomes: incomes(apiClient),
    incomeCategories: incomeCategories(apiClient),
    expenses: expenses(apiClient),
    expenseCategories: expenseCategories(apiClient),
    dashboard: dashboard(apiClient)
  }
}
