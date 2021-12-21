import ky from 'ky-universal'
import wallet from './wallet'

export default function MyBudget () {
  const apiClient = ky.create({
    prefixUrl: process.env.API_URL,
    headers: {
      'content-type': 'application/json'
    }
  })

  return {
    wallet: wallet(apiClient)
  }
}
