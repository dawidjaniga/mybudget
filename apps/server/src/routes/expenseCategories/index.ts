import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

import { ExpenseCategory } from '@mybudget/types'

/**
 * /api/expense-categories
 */
const router = Router()

/**
 * Get expense categories
 * GET /
 */
router.get('/', async function expenseCategoriesGetHandler(req, res) {
  /**
   * @todo 
   * Fetch real expense categories for the authorized user
   */

  const expenseCategories: ExpenseCategory[] = [
    {
      id: 'expense-category-1-a',
      name: 'Expense category 1'
    },
    {
      id: 'expense-category-2-b',
      name: 'Expense category 2'
    },
    {
      id: 'expense-category-3-c',
      name: 'Expense category 3'
    },
    {
      id: 'expense-category-4-d',
      name: 'Expense category 4',
      parentId: 'expense-category-1-a',
    },
    {
      id: 'expense-category-5-e',
      name: 'Expense category 5',
      parentId: 'expense-category-2-b',
    },
  ];

  return res.json({ data: expenseCategories })
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
    /** const validPayload = */ await createExpenseCategorySchema.validate(req.body)

    /**
     * @todo
     * Here payload is valid
     * We can safely create a new expense category
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
