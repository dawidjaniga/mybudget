import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { Money } from '@mybudget/types'

import { errorBoundary } from '../../middlewares'

/**
 * /api/incomes
 */
const router = Router()

/**
 * Get incomes
 * GET /
 */
router.get('/', errorBoundary(async function getIncomes(req, res) {
  const data = await req.repository.getAllIncomes()

  return res.json({ data })
}));

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

router.post('/', errorBoundary(async function postIncomes(req, res) {
  const validPayload = await createIncomeSchema.validate(req.body)
  const wallet = await req.repository.getWalletById(validPayload.walletId)
  const category = await req.repository.getIncomeCategoryById(validPayload.categoryId)

  const data = await req.repository.createIncome({
    walletId: wallet.id,
    categoryId: category.id,
    amount: validPayload.amount as Money,
    transactionDate: validPayload.transactionDate
  })

  res.status(StatusCodes.ACCEPTED).json({ data })
}))

export default router
