import { Expense, ExpenseCategory, Income, IncomeCategory, UserDashboard, Wallet } from "@mybudget/types";

export interface Repository {
    isOK(): Promise<boolean>

    /**
     * Wallet
     */
    createWallet(wallet: Omit<Wallet, 'id'>): Promise<Wallet>
    getWalletById(id: string): Promise<Wallet>
    getAllWallets(): Promise<Wallet[]>

    /**
     * Income
     */
    createIncome(income: Omit<Income, 'id'>): Promise<Income>
    getAllIncomes(): Promise<Income[]>

    /**
     * Expense÷
     */
    createExpense(expense: Omit<Expense, 'id'>): Promise<Expense>
    getAllExpenses(): Promise<Expense[]>

    /**
     * IncomeCategory
     */
    createIncomeCategory(incomeCategory: Omit<IncomeCategory, 'id'>): Promise<IncomeCategory>
    getIncomeCategoryById(id: string): Promise<IncomeCategory>
    getAllIncomeCategories(): Promise<IncomeCategory[]>

    /**
     * ExpenseCategory
     */
    createExpenseCategory(expenseCategory: Omit<ExpenseCategory, 'id'>): Promise<ExpenseCategory>
    getExpenseCategoryById(id: string): Promise<ExpenseCategory>
    getAllExpenseCategories(): Promise<ExpenseCategory[]>

    /**
     * Dashboard
     */
    getUserDashboard(): Promise<UserDashboard>
}