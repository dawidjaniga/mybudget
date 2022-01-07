import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { Money } from '@mybudget/types'

import { errorBoundary } from '../../middlewares'

/**
 * /api/expenses
 */
const router = Router()

/**
 * Get expenses
 * GET /
 */
router.get(
  '/',
  errorBoundary(async function getExpenses (req, res) {
    const data = await req.repository.getAllExpenses()

    res.json({ data })
  })
)

/**
 * Create expense
 * POST /
 */
const createExpenseSchema = yup.object().shape({
  walletId: yup.string().required(),
  categoryId: yup.string().required(),
  amount: yup
    .number()
    .integer()
    .positive()
    .required(),
  transactionDate: yup
    .date()
    .optional()
    .default(() => new Date())
})

router.post(
  '/',
  errorBoundary(async function postExpenses (req, res) {
    const validPayload = await createExpenseSchema.validate(req.body)
    const category = await req.repository.getExpenseCategoryById(
      validPayload.categoryId
    )

    const data = await req.repository.createExpense({
      walletId: validPayload.walletId,
      categoryId: category.id,
      amount: validPayload.amount as Money,
      transactionDate: validPayload.transactionDate
    })

    res.status(StatusCodes.ACCEPTED).json({ data })
  })
)

export default router
