import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

import { CurrencyCode, Money, Wallet } from '@mybudget/types'

/**
 * import WalletRepository from '../../app/repositories/WalletRepository'
 * const repo = new WalletRepository()
 */

/**
 * /api/wallets
 */
const router = Router()

/**
 * Get wallets
 * GET /
 */
router.get('/', async function walletsGetHandler(req, res) {
  /**
   * @todo 
   * Fetch real wallets for the authorized user
   */

  const wallets: Wallet[] = [
    {
      id: 'wallet-1-a',
      balance: 500 as Money,
      currency: 'PLN'
    },
    {
      id: 'wallet-2-b',
      balance: 1000 as Money,
      currency: 'USD'
    },
  ]

  return res.json({ data: wallets })
});

/**
 * Create wallet
 * POST /
 */
const allowedWalletCurrencies: CurrencyCode[] = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];

const createWalletSchema = yup.object().shape({
  currency: yup.string().oneOf(allowedWalletCurrencies).required(),
  initialBalance: yup.number().integer().optional().default(0)
})

router.post('/', async function walletsPostHandler(req, res) {
  try {
    /** const validPayload = */ await createWalletSchema.validate(req.body)

    /**
     * @todo
     * Here payload is valid
     * We can safely create a new wallet
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
