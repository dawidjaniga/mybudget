import { MyBudgetError } from './types'
import axios from 'axios'
import createDebug from 'debug'

const debug = createDebug('mybudget:error')

export function handleError (error: unknown): never {
  if (axios.isAxiosError(error)) {
    debug(error)

    if (error.response.data.message) {
      throw new MyBudgetError(error.response.data.message)
    }

    if (error.message === 'Network Error') {
      throw new MyBudgetError('There is a problem with Internet connection')
    }
  }

  throw new MyBudgetError('Unhandled Error')
}
