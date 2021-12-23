import { CurrencyCode, Money, Wallet } from './types'

import { AxiosInstance } from 'axios'

export type CreateWalletOptions = {
  currency: CurrencyCode
  initialBalance: Money
}

export default function wallet (apiClient: AxiosInstance) {
  const url = '/wallets'

  return {
    create: async ({
      currency,
      initialBalance
    }: CreateWalletOptions): Promise<Wallet | Error> => {
      try {
        const response = await apiClient.post<Wallet>(url, {
          currency,
          initialBalance
        })

        return response.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    },
    list: async (): Promise<Wallet[] | Error> => {
      try {
        const response = await apiClient.get<Wallet[]>(url)

        return response.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    }
  }
}
