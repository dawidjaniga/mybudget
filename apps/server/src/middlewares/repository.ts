import { NextFunction, Response, Request } from 'express'

import { MongoRepository } from '../repositories'

let $repository

function getRepository () {
  if ($repository) {
    return $repository
  }

  $repository = new MongoRepository()

  return $repository
}

export function repositoryMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * @todo
   * Environment configuration of repository
   */
  req.repository = getRepository()

  return next()
}
