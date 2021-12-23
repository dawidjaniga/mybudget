import { NextFunction, Response, Request } from 'express'

export const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
    req.user = {
        id: '____1234567890',
        username: 'Fake User'
    }

    return next();
}