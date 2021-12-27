import { ExpenseCategory } from './types'

import { AxiosInstance } from 'axios'

export type CreateExpenseCategoryOptions = {
  name: string
  parentid?: string
}

export default function expenseCategories (apiClient: AxiosInstance) {
  const url = '/expense-categories'

  return {
    create: async ({
      name,
      parentid
    }: CreateExpenseCategoryOptions): Promise<ExpenseCategory | Error> => {
      try {
        const response = await apiClient.post<ExpenseCategory>(url, {
          name,
          parentid
        })

        return response.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    },
    list: async (): Promise<ExpenseCategory[] | Error> => {
      try {
        const response = await apiClient.get<ExpenseCategory[]>(url)

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
