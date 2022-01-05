import { UserDashboard, Data } from './types'

import { AxiosInstance } from 'axios'
import { handleError } from './errorHandler'

export default function dashboard (apiClient: AxiosInstance) {
  const url = '/dashboard'

  return {
    get: async (): Promise<UserDashboard | Error> => {
      try {
        const response = await apiClient.get<Data<UserDashboard>>(url)

        return response.data.data
      } catch (e) {
        handleError(e)
      }
    }
  }
}
