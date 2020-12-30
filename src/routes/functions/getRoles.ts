import { Request, Response, NextFunction } from 'express'

import { Role } from '../../models'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await Role.find())
        return next()
    } catch (err) {
        return next(err)
    }
}
