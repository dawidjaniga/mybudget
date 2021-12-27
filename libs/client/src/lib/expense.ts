import { Expense, Money } from './types'

import { AxiosInstance } from 'axios'

export type CreateExpenseOptions = {
  walletId: string
  categoryId: string
  amount: Money
  transactionDate?: Date
}

export default function expense(apiClient: AxiosInstance) {
  const url = '/expenses'

  return {
    create: async ({
      walletId,
      categoryId,
      amount,
      transactionDate
    }: CreateExpenseOptions): Promise<Expense | Error> => {
      try {
        const response = await apiClient.post<Expense>(url, {
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
    list: async (): Promise<Expense[] | Error> => {
      try {
        const response = await apiClient.get<Expense[]>(url)

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
