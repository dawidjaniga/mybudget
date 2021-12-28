import { Router } from 'express'

import { errorBoundary } from '../../middlewares';

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
router.get('/', errorBoundary(async function getDashboard(req, res) {
  const data = await req.repository.getUserDashboard();

  return res.json({ data })
}));

export default router
