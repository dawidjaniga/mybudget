import { User, CurrencyCode, Wallet } from '@mybudget/types'

export type CreateOptions = {
  user?: User
  currency: CurrencyCode
}
export interface IWalletRepository {
  create(options: CreateOptions): Promise<Wallet | Error>
}
