import { Income, Money } from './types'

import { AxiosInstance } from 'axios'

export type AddIncomeOptions = {
  walletId: string
  categoryId: string
  amount: Money
  transactionDate?: Date
}

export default function incomes (apiClient: AxiosInstance) {
  const url = '/incomes'

  return {
    add: async ({
      walletId,
      categoryId,
      amount,
      transactionDate
    }: AddIncomeOptions): Promise<Income | Error> => {
      try {
        const response = await apiClient.post<Income>(url, {
          walletId,
          categoryId,
          amount,
          transactionDate
        })

        return response.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    },
    list: async (): Promise<Income[] | Error> => {
      try {
        const response = await apiClient.get<Income[]>(url)

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
