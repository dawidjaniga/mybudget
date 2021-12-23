import axios from 'axios'
import wallet from './wallet'

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
    wallet: wallet(apiClient)
  }
}
