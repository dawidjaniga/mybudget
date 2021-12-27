import { UserDashboard } from './types'

import { AxiosInstance } from 'axios'

export default function dashboard(apiClient: AxiosInstance) {
  const url = '/dashboard'

  return async (): Promise<UserDashboard | Error> => {
    try {
      const response = await apiClient.get<UserDashboard>(url)

      return response.data
    } catch (e) {
      if (e instanceof Error) {
        return e
      }

      console.error('Unknown error')
    }
  }
}
