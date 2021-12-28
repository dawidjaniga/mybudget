import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { CurrencyCode, Money } from '@mybudget/types'

import { errorBoundary } from '../../middlewares'

/**
 * /api/wallets
 */
const router = Router()

/**
 * Get wallets
 * GET /
 */
router.get('/', errorBoundary(async function getWallets(req, res) {
  const data = await req.repository.getAllWallets()

  res.json({ data })
}));

/**
 * Create wallet
 * POST /
 */
const allowedWalletCurrencies: CurrencyCode[] = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];

const createWalletSchema = yup.object().shape({
  currency: yup.string().oneOf(allowedWalletCurrencies).required(),
  initialBalance: yup.number().integer().optional().default(0)
})

router.post('/', errorBoundary(async function postWallets(req, res) {
  const validPayload = await createWalletSchema.validate(req.body)

  const data = await req.repository.createWallet({
    currency: validPayload.currency as CurrencyCode,
    balance: validPayload.initialBalance as Money
  })

  res.status(StatusCodes.ACCEPTED).json({ data })
}))

export default router
