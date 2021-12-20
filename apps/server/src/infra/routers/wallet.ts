import { Router } from 'express'
import WalletRepository from '../../app/repositories/WalletRepository'

const router = Router()
const repo = new WalletRepository()

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to wallet!' })
})

router.post('/', async (req, res) => {
  try {
    await repo.create({ currency: 'GBP' })
    res.send({ message: 'Welcome to wallet!' })
    // if (req.body.currency) {
    //   // await repo.create({ currency: req.body.currency })
    // } else {
    //   res.send({ error: 'Currency not defined' })
    // }
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message })
    }
  }
})

export default router
