import { CurrencyCode, Money, Wallet } from './../../server/src/types/index'
import { KyInstance } from 'ky/distribution/types/ky'

export type CreateWalletOptions = {
  currency: CurrencyCode
  initialBalance: Money
}

export default function wallet (apiClient: KyInstance) {
  return {
    create: async ({
      currency,
      initialBalance
    }: CreateWalletOptions): Promise<Wallet | Error> => {
      try {
        const wallet = await apiClient
          .post('/wallet', {
            json: {
              currency,
              initialBalance
            }
          })
          .json<Wallet>()

        return wallet
      } catch (e) {
        if (e instanceof Error) {
          return e
        }

        console.error('Unknown error')
      }
    }
  }
}
