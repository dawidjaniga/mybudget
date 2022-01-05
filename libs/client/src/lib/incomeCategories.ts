import { Data, IncomeCategory } from './types'

import { AxiosInstance } from 'axios'
import { handleError } from './errorHandler'

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
    }: CreateIncomeCategoryOptions): Promise<IncomeCategory> => {
      try {
        const response = await apiClient.post<Data<IncomeCategory>>(url, {
          name,
          parentid
        })

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    },
    list: async (): Promise<IncomeCategory[]> => {
      try {
        const response = await apiClient.get<Data<IncomeCategory[]>>(url)

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    }
  }
}
