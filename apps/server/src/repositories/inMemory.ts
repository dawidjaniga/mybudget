import { Expense, ExpenseCategory, Income, IncomeCategory, Money, UserDashboard, Wallet } from "@mybudget/types";
import { Repository } from "./types";

export class InMemoryRepository implements Repository {
  private data: {
    wallets: Wallet[],
    incomes: Income[],
    expenses: Expense[],
    incomeCategories: IncomeCategory[],
    expenseCategories: ExpenseCategory[]
  };

  constructor() {
    this.data = {
      wallets: [],
      incomes: [],
      expenses: [],
      incomeCategories: [],
      expenseCategories: []
    };
  }

  async isOK(): Promise<boolean> {
    return true;
  }

  /**
   * Wallets
   */
  async createWallet(data: Omit<Wallet, 'id'>): Promise<Wallet> {
    const wallet: Wallet = {
      ...data,
      id: Date.now().toString()
    }

    this.data.wallets.push(wallet)

    return wallet
  }

  async getAllWallets(): Promise<Wallet[]> {
    return this.data.wallets;
  }

  async getWalletById(id: string): Promise<Wallet> {
    const wallet = this.data.wallets.find(item => item.id === id)

    if (!wallet) {
      throw new Error(`Wallet 'id=${id}' does not exist`)
    }

    return wallet
  }

  private async increaseWalletBalance(walletId: string, amount: Money): Promise<void> {
    const index = this.data.wallets.findIndex(item => item.id === walletId);

    if (index < 0) {
      throw new Error(`Wallet=${walletId} is not found`);
    }

    const wallet = this.data.wallets[index];

    this.data.wallets[index] = {
      ...wallet,
      balance: wallet.balance + amount as Money
    }
  }

  private async decreaseWalletBalance(walletId: string, amount: Money): Promise<void> {
    const index = this.data.wallets.findIndex(item => item.id === walletId);

    if (index < 0) {
      throw new Error(`Wallet 'id=${walletId}' does not exist`)
    }

    const wallet = this.data.wallets[index];

    this.data.wallets[index] = {
      ...wallet,
      balance: wallet.balance - amount as Money
    }
  }

  /**
   * Income
   */
  async createIncome(data: Omit<Income, 'id'>): Promise<Income> {
    const income: Income = {
      ...data,
      id: Date.now().toString()
    };

    this.data.incomes.push(income)
    this.increaseWalletBalance(income.walletId, income.amount)

    return income
  }

  async getAllIncomes(): Promise<Income[]> {
    return this.data.incomes;
  }

  /**
   * Expense÷
   */
  async createExpense(data: Omit<Expense, 'id'>): Promise<Expense> {
    const expense = {
      ...data,
      id: Date.now().toString()
    };

    this.data.expenses.push(expense)
    this.decreaseWalletBalance(expense.walletId, expense.amount)

    return expense;
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.data.expenses;
  }

  /**
   * IncomeCategory
   */
  async createIncomeCategory(data: Omit<IncomeCategory, 'id'>): Promise<IncomeCategory> {
    const incomeCategory = {
      ...data,
      id: Date.now().toString()
    }

    this.data.incomeCategories.push(incomeCategory)

    return incomeCategory
  }

  async getAllIncomeCategories(): Promise<IncomeCategory[]> {
    return this.data.incomeCategories;
  }

  async getIncomeCategoryById(id: string): Promise<IncomeCategory> {
    const incomeCategory = this.data.incomeCategories.find(item => item.id === id)

    if (!incomeCategory) {
      throw new Error(`IncomeCategory 'id=${id}' does not exist`)
    }

    return incomeCategory
  }

  /**
   * ExpenseCategory
   */
  async createExpenseCategory(data: Omit<ExpenseCategory, 'id'>): Promise<ExpenseCategory> {
    const expenseCategory: ExpenseCategory = {
      ...data,
      id: Date.now().toString()
    }

    this.data.expenseCategories.push(expenseCategory)

    return expenseCategory
  }

  async getAllExpenseCategories(): Promise<ExpenseCategory[]> {
    return this.data.expenseCategories;
  }

  async getExpenseCategoryById(id: string): Promise<ExpenseCategory> {
    const expenseCategory = this.data.expenseCategories.find(item => item.id === id)

    if (!expenseCategory) {
      throw new Error(`ExpenseCategory 'id=${id}' does not exist`)
    }

    return expenseCategory
  }

  /**
   * Dashboard
   */
  async getUserDashboard(): Promise<UserDashboard> {
    return {
      wallets: this.data.wallets
    }
  }
}