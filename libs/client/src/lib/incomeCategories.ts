import { IncomeCategory } from './types'

import { AxiosInstance } from 'axios'

export type CreateIncomeCategoryOptions = {
  name: string
  parentid?: string
}

export default function incomeCategories (apiClient: AxiosInstance) {
  const url = '/income-categories'

  return {
    create: async ({
      name,
      parentid
    }: CreateIncomeCategoryOptions): Promise<IncomeCategory | Error> => {
      try {
        const response = await apiClient.post<IncomeCategory>(url, {
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
    list: async (): Promise<IncomeCategory[] | Error> => {
      try {
        const response = await apiClient.get<IncomeCategory[]>(url)

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
