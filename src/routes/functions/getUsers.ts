import { Request, Response, NextFunction } from 'express'

import { User } from '../../models'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await User.find({}, { password: 0 }))
        return next()
    } catch (err) {
        return next(err)
    }
}
