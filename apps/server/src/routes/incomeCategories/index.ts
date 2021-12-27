import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

/**
 * /api/income-categories
 */
const router = Router()

/**
 * Get income categories
 * GET /
 */
router.get('/', async function incomeCategoriesGetHandler(req, res) {
  const data = await req.repository.getAllIncomeCategories()

  res.json({ data })
});

/**
 * Create income category
 * POST /
 */
const createIncomeCategorySchema = yup.object().shape({
  parentId: yup.string().optional(),
  name: yup.string().required()
})

router.post('/', async function incomeCategoriesPostHandler(req, res) {
  try {
    const validPayload = await createIncomeCategorySchema.validate(req.body)
    const parent = validPayload.parentId ? await req.repository.getIncomeCategoryById(validPayload.parentId) : null

    const data = await req.repository.createIncomeCategory({
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
