import { Router } from 'express'

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
  const data = await req.repository.getUserDashboard();

  return res.json({ data })
});

export default router
