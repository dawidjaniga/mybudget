import { Wallet } from "@mybudget/types";

export interface Repository {
    isOK(): Promise<boolean>

    /**
     * Wallet
     */
    createWallet(wallet: Omit<Wallet, 'id'>): Promise<void>
    getAllWallets(): Promise<Wallet[]>
}