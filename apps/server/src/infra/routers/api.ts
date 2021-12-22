import { Router } from 'express'
import * as bodyParser from 'body-parser';

import wallets from './wallets'
import incomes from './incomes'
import incomeCategories from './incomeCategories'
import expenses from './expenses'
import expenseCategories from './expenseCategories'

const router = Router()

/**
 * @todo 
 * Create global authMiddleware and use it in:
 * - /wallets
 * - /incomes
 * - /expences
 * - /dashboards
 */

router.use(bodyParser.json())

router.use('/wallets', wallets)
router.use('/incomes', incomes)
router.use('/income-categories', incomeCategories)
router.use('/expenses', expenses)
router.use('/expense-categories', expenseCategories)

export default router
