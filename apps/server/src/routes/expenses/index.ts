import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

import { Expense, Money } from '@mybudget/types'

/**
 * /api/expenses
 */
const router = Router()

/**
 * Get expenses
 * GET /
 */
router.get('/', async function expensesGetHandler(req, res) {
  /**
   * @todo 
   * Fetch real expenses for the authorized user
   */

  const expenses: Expense[] = [
    {
      id: 'expense-1-a',
      walletId: 'wallet-1-a',
      categoryId: 'expense-category-1-a',
      amount: 100 as Money,
      transactionDate: new Date(),
    },
    {
      id: 'expense-2-b',
      walletId: 'wallet-1-a',
      categoryId: 'expense-category-2-b',
      amount: 200 as Money,
      transactionDate: new Date(),
    },
    {
      id: 'expense-3-c',
      walletId: 'wallet-2-b',
      categoryId: 'expense-category-1-a',
      amount: 300 as Money,
      transactionDate: new Date(),
    },
  ];

  return res.json({ data: expenses })
});

/**
 * Create expense
 * POST /
 */
const createExpenseSchema = yup.object().shape({
  walletId: yup.string().required(),
  categoryId: yup.string().required(),
  amount: yup.number().integer().positive().required(),
  transactionDate: yup.date().optional().default(() => new Date())
})

router.post('/', async function expensesPostHandler(req, res) {
  try {
    /** const validPayload = */ await createExpenseSchema.validate(req.body)

    /**
     * @todo
     * Here payload is valid
     * We can safely create a new expense
     * based on validPayload value
     */

    return res.status(StatusCodes.ACCEPTED).json({ message: ReasonPhrases.ACCEPTED })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
})

export default router
