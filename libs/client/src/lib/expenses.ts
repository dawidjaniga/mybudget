import { Expense, Money, Data } from './types'

import { AxiosInstance } from 'axios'
import { handleError } from './errorHandler'

export type AddExpenseOptions = {
  walletId: string
  categoryId: string
  amount: Money
  transactionDate?: Date
}

export default function expenses (apiClient: AxiosInstance) {
  const url = '/expenses'

  return {
    add: async ({
      walletId,
      categoryId,
      amount,
      transactionDate
    }: AddExpenseOptions): Promise<Expense> => {
      try {
        const response = await apiClient.post<Data<Expense>>(url, {
          walletId,
          categoryId,
          amount,
          transactionDate
        })

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    },
    list: async (): Promise<Expense[]> => {
      try {
        const response = await apiClient.get<Data<Expense[]>>(url)

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    }
  }
}
