import { Expense, ExpenseCategory, Income, IncomeCategory, Money, UserDashboard, Wallet } from "@mybudget/types";
import { Repository } from "./types";

interface InMemoryStore {
  wallets: Wallet[],
  incomes: Income[],
  expenses: Expense[],
  incomeCategories: IncomeCategory[],
  expenseCategories: ExpenseCategory[]
}

export class InMemoryRepository implements Repository {
  private data: InMemoryStore;

  constructor() {
    this.data = buildInitialInMemoryStore();
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

function buildInitialInMemoryStore(): InMemoryStore {
  return {
    wallets: [],
    incomes: [],
    expenses: [],
    incomeCategories: [
      { name: "Salary", id: "0" },
      { name: "Cheques and coupons", id: "1" },
      { name: "Child donation", id: "2" },
      { name: "Gift", id: "3" },
      { name: "Rental income", id: "4" },
      { name: "Lottery", id: "5" },
      { name: "Dividend", id: "6" },
      { name: "Tax refund", id: "7" }
    ],
    expenseCategories: [
      { name: "Food and drinks", id: "0" },
      { name: "Restaurans and fast foods", id: "00", parentId: "0" },
      { name: "Coffee", id: "01", parentId: "0" },
      { name: "Alcohols", id: "02", parentId: "0" },
      { name: "Shopping", id: "1" },
      { name: "Groceries", id: "10", parentId: "1" },
      { name: "Health and beauty", id: "11", parentId: "1" },
      { name: "Clothing and footwear", id: "12", parentId: "1" },
      { name: "House and garden", id: "13", parentId: "1" },
      { name: "Pharmaceuticals", id: "14", parentId: "1" },
      { name: "Electronics and accessories", id: "15", parentId: "1" },
      { name: "Kids", id: "1", parentId: "16" },
      { name: "Jewelry", id: "1", parentId: "17" },
      { name: "Pets", id: "1", parentId: "18" },
      { name: "Building Materials and tools", id: "19", parentId: "1" },
      { name: "Housing", id: "2" },
      { name: "Insurance", id: "20", parentId: "2" },
      { name: "Mortgage", id: "21", parentId: "2" },
      { name: "Maintenance and repair", id: "22", parentId: "2" },
      { name: "Services", id: "23", parentId: "2" },
      { name: "Renting", id: "24", parentId: "2" },
      { name: "Energy and heating", id: "25", parentId: "2" },
      { name: "Public transport", id: "3" },
      { name: "Flight", id: "30", parentId: "3" },
      { name: "Train", id: "31", parentId: "3" },
      { name: "Bus", id: "32", parentId: "3" },
      { name: "Taxi", id: "33", parentId: "3" },
      { name: "Car", id: "4" },
      { name: "Fuel", id: "40", parentId: "4" },
      { name: "Service", id: "41", parentId: "4" },
      { name: "Parking", id: "42", parentId: "4" },
      { name: "Insurance", id: "43", parentId: "4" },
      { name: "Leasing", id: "44", parentId: "4" },
      { name: "IT & Communication Services", id: "5" },
      { name: "Internet", id: "50", parentId: "5" },
      { name: "Applications", id: "51", parentId: "5" },
      { name: "Games", id: "52", parentId: "5" },
      { name: "Mobile Services", id: "53", parentId: "5" },
      { name: "Cloud storage", id: "54", parentId: "5" },
      { name: "Others", id: "6" },
    ]
  }
}
