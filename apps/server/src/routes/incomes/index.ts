import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

import { Money } from '@mybudget/types'

/**
 * /api/incomes
 */
const router = Router()

/**
 * Get incomes
 * GET /
 */
router.get('/', async function incomesGetHandler(req, res) {
  const data = await req.repository.getAllIncomes()

  return res.json({ data })
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
    const validPayload = await createIncomeSchema.validate(req.body)
    const wallet = await req.repository.getWalletById(validPayload.walletId)
    const category = await req.repository.getIncomeCategoryById(validPayload.categoryId)

    const data = await req.repository.createIncome({
      walletId: wallet.id,
      categoryId: category.id,
      amount: validPayload.amount as Money,
      transactionDate: validPayload.transactionDate
    })

    return res.status(StatusCodes.ACCEPTED).json({ data })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
})

export default router
