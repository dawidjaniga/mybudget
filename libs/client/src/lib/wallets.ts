import { CurrencyCode, Data, Money, Wallet } from './types'

import { AxiosInstance } from 'axios'
import { handleError } from './errorHandler'

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
    }: CreateWalletOptions): Promise<Wallet> => {
      try {
        const response = await apiClient.post<Data<Wallet>>(url, {
          currency,
          initialBalance
        })

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    },
    list: async (): Promise<Wallet[]> => {
      try {
        const response = await apiClient.get<Data<Wallet[]>>(url)

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    }
  }
}
