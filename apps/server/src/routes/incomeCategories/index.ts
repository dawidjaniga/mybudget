import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

import { IncomeCategory } from '@mybudget/types'

/**
 * /api/income-categories
 */
const router = Router()

/**
 * Get income categories
 * GET /
 */
router.get('/', async function incomeCategoriesGetHandler(req, res) {
  /**
   * @todo 
   * Fetch real income categories for the authorized user
   */

  const incomeCategories: IncomeCategory[] = [
    {
      id: 'income-category-1-a',
      name: 'income category 1'
    },
    {
      id: 'income-category-2-b',
      name: 'income category 2'
    },
    {
      id: 'income-category-3-c',
      name: 'income category 3'
    },
    {
      id: 'income-category-4-d',
      name: 'income category 4',
      parentId: 'income-category-1-a',
    },
    {
      id: 'income-category-5-e',
      name: 'income category 5',
      parentId: 'income-category-2-b',
    },
  ];

  return res.json({ data: incomeCategories })
});

/**
 * Create income category
 * POST /
 */
const createincomeCategorySchema = yup.object().shape({
  parentId: yup.string().optional(),
  name: yup.string().required()
})

router.post('/', async function incomeCategoriesPostHandler(req, res) {
  try {
    /** const validPayload = */ await createincomeCategorySchema.validate(req.body)

    /**
     * @todo
     * Here payload is valid
     * We can safely create a new income category
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
