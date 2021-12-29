import { CurrencyCode, Data, Money, Wallet } from './types'

import { AxiosInstance } from 'axios'

export type CreateWalletOptions = {
  currency: CurrencyCode
  initialBalance: Money
}

export default function wallets (apiClient: AxiosInstance) {
  const url = '/wallets'

  return {
    create: async ({
      currency,
      initialBalance
    }: CreateWalletOptions): Promise<Wallet | Error> => {
      try {
        const response = await apiClient.post<Data<Wallet>>(url, {
          currency,
          initialBalance
        })

        return response.data.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    },
    list: async (): Promise<Wallet[] | Error> => {
      try {
        const response = await apiClient.get<Data<Wallet[]>>(url)

        return response.data.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    }
  }
}
