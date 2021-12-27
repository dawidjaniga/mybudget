import axios from 'axios'

import wallet from './wallet'
import income from './income'
import incomeCategory from './incomeCategory'
import expense from './expense'
import expenseCategory from './expenseCategory'
import dashboard from './dashboard'

export function MyBudget() {
  const apiClient = axios.create({
    // baseURL: process.env.API_URL,
    // @TODO: replace with inline process env replacer
    baseURL: 'https://api-mybudget.herokuapp.com/api',
    headers: {
      'content-type': 'application/json'
    }
  })

  return {
    wallet: wallet(apiClient),
    income: income(apiClient),
    incomeCategory: incomeCategory(apiClient),
    expense: expense(apiClient),
    expenseCategory: expenseCategory(apiClient),
    dashboard: dashboard(apiClient),
  }
}
