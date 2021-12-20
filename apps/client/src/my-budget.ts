import ky from 'ky-universal'
import income from './income'
// import expense from './expense'
// import wallet from './wallet'

// …

export default function MyBudget (apiKey: string) {
  // const apiClient1 = ky.create({
  //   prefixUrl: 'https://example.com/api',
  //   headers: {
  //     'content-type': 'application/json',
  //     'x-api-key': apiKey
  //   }
  // })
  const apiClient = {}

  // console.log(apiClient1)

  return {
    income: income(apiClient)
    // expense: expense(apiClient),
    // wallet: wallet(apiClient)
  }
}
