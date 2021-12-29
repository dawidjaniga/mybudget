import { Data, ExpenseCategory } from './types'

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
        const response = await apiClient.post<Data<ExpenseCategory>>(url, {
          name,
          parentid
        })

        return response.data.data
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    },
    list: async (): Promise<ExpenseCategory[] | Error> => {
      try {
        const response = await apiClient.get<Data<ExpenseCategory[]>>(url)

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
