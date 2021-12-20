import { User, CurrencyCode, Wallet } from '../types'

export type CreateOptions = {
  user: User
  currency: CurrencyCode
}
export interface IWalletRepository {
  create(options: CreateOptions): Promise<Wallet | Error>
}
