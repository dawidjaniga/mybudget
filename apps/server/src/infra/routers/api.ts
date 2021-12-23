import { Router } from 'express'
import * as bodyParser from 'body-parser';

import wallets from './wallets'
import incomes from './incomes'
import incomeCategories from './incomeCategories'
import expenses from './expenses'
import expenseCategories from './expenseCategories'
import dashboard from './dashboard'

const router = Router()

/**
 * @todo 
 * Create global authMiddleware and use it in:
 * - /wallets
 * - /incomes
 * - /expences
 * - /dashboard
 */

router.use(bodyParser.json())

router.use('/wallets', wallets)
router.use('/incomes', incomes)
router.use('/income-categories', incomeCategories)
router.use('/expenses', expenses)
router.use('/expense-categories', expenseCategories)

/**
 * We use singular name for dashboard as we will 
 * have only 1 read-only dashboard model per user
 */
router.use('/dashboard', dashboard)

export default router
