import { Router } from 'express'
import * as bodyParser from 'body-parser';

import wallets from './wallets'
import incomes from './incomes'
import expenses from './expenses'

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
router.use('/expenses', expenses)

export default router
