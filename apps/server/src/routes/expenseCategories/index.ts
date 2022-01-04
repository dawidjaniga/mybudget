import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { errorBoundary } from '../../middlewares';

/**
 * /api/expense-categories
 */
const router = Router()

/**
 * Get expense categories
 * GET /
 */
router.get('/', errorBoundary(async function getExpenseCategories(req, res) {
  const data = await req.repository.getAllExpenseCategories()

  res.json({ data })
}));

/**
 * Create expense category
 * POST /
 */
const createExpenseCategorySchema = yup.object().shape({
  parentId: yup.string().optional(),
  name: yup.string().required()
})

router.post('/', errorBoundary(async function postExpenseCategories(req, res) {
  const validPayload = await createExpenseCategorySchema.validate(req.body)
  const parent = validPayload.parentId ? await req.repository.getExpenseCategoryById(validPayload.parentId) : null

  const data = await req.repository.createExpenseCategory({
    name: validPayload.name,
    parentId: parent?.id || undefined
  })

  res.status(StatusCodes.ACCEPTED).json({ data })
}))

export default router
