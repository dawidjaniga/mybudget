import { NextFunction, Response, Request } from 'express'

import { InMemoryRepository } from '../repositories';

let $repository;

function getRepository() {
  if ($repository) {
    return $repository
  }

  $repository = new InMemoryRepository();

  return $repository;
}

export function repositoryMiddleware(req: Request, res: Response, next: NextFunction) {
  /**
   * @todo
   * Environment configuration of repository
   */
  req.repository = getRepository()

  return next();
}