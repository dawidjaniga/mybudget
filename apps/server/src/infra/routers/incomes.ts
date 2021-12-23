import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

import { Income, Money } from '@mybudget/types'

/**
 * /api/incomes
 */
const router = Router()

/**
 * Get incomes
 * GET /
 */
router.get('/', async function incomesGetHandler(req, res) {
  /**
   * @todo 
   * Fetch real incomes for the authorized user
   */

  const incomes: Income[] = [
    {
      id: 'income-1-a',
      walletId: 'wallet-1-a',
      categoryId: 'income-category-1-a',
      amount: 100 as Money,
      transactionDate: new Date(),
    },
    {
      id: 'income-2-b',
      walletId: 'wallet-1-a',
      categoryId: 'income-category-2-b',
      amount: 200 as Money,
      transactionDate: new Date(),
    },
    {
      id: 'income-3-c',
      walletId: 'wallet-2-b',
      categoryId: 'income-category-1-a',
      amount: 300 as Money,
      transactionDate: new Date(),
    },
  ];

  return res.json({ data: incomes })
});

/**
 * Create income
 * POST /
 */
const createIncomeSchema = yup.object().shape({
  walletId: yup.string().required(),
  categoryId: yup.string().required(),
  amount: yup.number().integer().positive().required(),
  transactionDate: yup.date().optional().default(() => new Date())
})

router.post('/', async function incomesPostHandler(req, res) {
  try {
    /** const validPayload = */ await createIncomeSchema.validate(req.body)

    /**
     * @todo
     * Here payload is valid
     * We can safely create a new income
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