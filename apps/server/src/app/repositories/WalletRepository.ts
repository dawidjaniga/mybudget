import {
  CreateOptions,
  IWalletRepository
} from './../../interfaces/WalletRepository'

import { Wallet, Money } from '../../types'
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

const walletSchema = new mongoose.Schema({
  id: String,
  currency: String
})

const WalletModel = mongoose.model('Wallet', walletSchema)

export default class WalletRepository implements IWalletRepository {
  constructor () {
    this.connect()
  }

  async connect () {
    await mongoose.connect(uri)
  }
  async create (options: CreateOptions): Promise<Wallet> {
    const item = new WalletModel({
      id: Math.random() + '',
      currency: options.currency
    })

    await item.save()

    const wallet: Wallet = {
      id: 'qwert-123',
      balance: 1000 as Money,
      currency: 'GBP',
      ...options
    }

    return Promise.resolve(wallet)
  }
}
