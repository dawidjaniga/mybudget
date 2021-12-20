import { Money } from './types'
import { KyInstance } from 'ky/distribution/types/ky'

export type IncomeCategory = 'home' | 'food'
export type Income = {
  id: string
  name: string
}

// export default function Income (apiClient: KyInstance) {
export default function Income (apiClient: {}) {
  return {
    add: async (
      category: IncomeCategory,
      amount: Money
    ): Promise<Income | Error> => {
      try {
        // const income = await apiClient
        //   .post('/income', {
        //     json: {
        //       category,
        //       amount
        //     }
        //   })
        //   .json<Income>()

        return {
          id: '123',
          name: '123'
        }

        // return income
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        return Error('Unknown error')
      }
    }
  }
}
