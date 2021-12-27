import type { User } from '@mybudget/types'

import type { Repository } from './repositories'

declare global {
  namespace Express {
    interface Request {
      user?: User
      repository: Repository
    }
  }
}