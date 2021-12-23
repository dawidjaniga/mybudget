import { User } from '@mybudget/types'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}