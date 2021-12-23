import { Router } from 'express'
import * as bodyParser from 'body-parser';

import wallets from './routes/wallets'
import incomes from './routes/incomes'
import incomeCategories from './routes/incomeCategories'
import expenses from './routes/expenses'
import expenseCategories from './routes/expenseCategories'
import dashboard from './routes/dashboard'

import { repositoryMiddleware } from './middlewares'

const router = Router()

router.use(repositoryMiddleware)
router.use(bodyParser.json())

router.use('/wallets', wallets)
router.use('/incomes', incomes)
router.use('/income-categories', incomeCategories)
router.use('/expenses', expenses)
router.use('/expense-categories', expenseCategories)
router.use('/dashboard', dashboard) // 1 dashboard per user, so singular

/**
 * @todo
 * Global error handler as middleware
 */

export default router
