import { Router } from 'express'

import { Money, UserDashboard } from '@mybudget/types'

/**
 * /api/dashboard
 *
 * We use singular name for dashboard as we will 
 * have only 1 read-only dashboard model per user
 */
const router = Router()

/**
 * Get dashboard
 * GET /
 */
router.get('/', async function walletsGetHandler(req, res) {
  /**
   * @todo 
   * Fetch real dashboard for the authorized user
   */

  const dashboard: UserDashboard = {
    wallets: [
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
  }

  return res.json({ data: dashboard })
});

export default router
