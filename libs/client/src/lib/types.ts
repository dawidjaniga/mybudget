import { CreateWalletOptions } from './wallets'
import { CreateIncomeCategoryOptions } from './incomeCategories'
import { CreateExpenseCategoryOptions } from './expenseCategories'
import { AddIncomeOptions } from './incomes'
import { AddExpenseOptions } from './expenses'
/**
 * @todo Use @mybudget/types
 */
export type Money = number & {
  __brand: 'money'
}

export type CurrencyCode = 'PLN' | 'USD' | 'EUR' | 'GBP' | 'CHF'

export type Wallet = {
  id: string
  balance: Money
  currency: CurrencyCode
}

export type User = {
  id: string
  username: string
}

export type Income = {
  id: string
  walletId: string
  categoryId: string
  amount: Money
  transactionDate: Date
}

export type IncomeCategory = {
  id: string
  parentId?: string
  name: string
}

export type Expense = {
  id: string
  walletId: string
  categoryId: string
  amount: Money
  transactionDate: Date
}

export type ExpenseCategory = {
  id: string
  parentId?: string
  name: string
}

export type UserDashboard = {
  wallets: Wallet[]
}

export type Data<T> = {
  data: T
}

export class MyBudgetError extends Error {
  constructor (message: string) {
    super(message)
  }
}

export {
  AddExpenseOptions,
  AddIncomeOptions,
  CreateExpenseCategoryOptions,
  CreateIncomeCategoryOptions,
  CreateWalletOptions
}
