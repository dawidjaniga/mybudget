import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { errorBoundary } from '../../middlewares';

/**
 * /api/income-categories
 */
const router = Router()

/**
 * Get income categories
 * GET /
 */
router.get('/', errorBoundary(async function getIncomeCategories(req, res) {
  const data = await req.repository.getAllIncomeCategories()

  res.json({ data })
}));

/**
 * Create income category
 * POST /
 */
const createIncomeCategorySchema = yup.object().shape({
  parentId: yup.string().optional(),
  name: yup.string().required()
})

router.post('/', errorBoundary(async function postIncomeCategories(req, res) {
  const validPayload = await createIncomeCategorySchema.validate(req.body)
  const parent = validPayload.parentId ? await req.repository.getIncomeCategoryById(validPayload.parentId) : null

  const data = await req.repository.createIncomeCategory({
    name: validPayload.name,
    parentId: parent?.id || undefined
  })

  return res.status(StatusCodes.ACCEPTED).json({ data })
}))

export default router
