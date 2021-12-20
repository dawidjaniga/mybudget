import {
  CreateOptions,
  IWalletRepository
} from './../../interfaces/WalletRepository'

import { Wallet, Money } from '../../types'

export default class WalletRepository implements IWalletRepository {
  async create (options: CreateOptions): Promise<Wallet> {
    const wallet: Wallet = {
      id: 'qwert-123',
      balance: 1000 as Money,
      currency: 'GBP',
      ...options
    }

    return Promise.resolve(wallet)
  }
}
