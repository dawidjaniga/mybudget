import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

/**
 * /api/expense-categories
 */
const router = Router()

/**
 * Get expense categories
 * GET /
 */
router.get('/', async function expenseCategoriesGetHandler(req, res) {
  const data = await req.repository.getAllExpenseCategories()

  res.json({ data })
});

/**
 * Create expense category
 * POST /
 */
const createExpenseCategorySchema = yup.object().shape({
  parentId: yup.string().optional(),
  name: yup.string().required()
})

router.post('/', async function expenseCategoriesPostHandler(req, res) {
  try {
    const validPayload = await createExpenseCategorySchema.validate(req.body)
    const parent = validPayload.parentId ? await req.repository.getExpenseCategoryById(validPayload.parentId) : null

    const data = await req.repository.createExpenseCategory({
      name: validPayload.name,
      parentId: parent?.id || undefined
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
