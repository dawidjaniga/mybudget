import { Router } from 'express'
import wallet from './wallet'

const router = Router()

router.use('/wallet', wallet)

export default router
