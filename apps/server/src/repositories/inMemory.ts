import { Wallet } from "@mybudget/types";
import { Repository } from "./types";

export class InMemoryRepository implements Repository {
  private data: {
    wallets: Wallet[]
  };

  constructor() {
    this.data = {
      wallets: []
    };
  }

  async isOK(): Promise<boolean> {
    return true;
  }

  /**
   * Wallets
   */
  async createWallet(data: Omit<Wallet, 'id'>): Promise<void> {
    this.data.wallets.push({
      ...data,
      id: Date.now().toString()
    })
  }

  async getAllWallets(): Promise<Wallet[]> {
    return this.data.wallets;
  }
}