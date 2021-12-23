import axios from 'axios'
import wallet from './wallet'

export function MyBudget () {
  const apiClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'content-type': 'application/json'
    }
  })

  return {
    wallet: wallet(apiClient)
  }
}
