import { Request, Response, NextFunction } from 'express'

import { RefreshToken } from '../../models'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        await RefreshToken.deleteOne({ _id: req.params.id })
        res.sendStatus(200)
        return next()
    } catch (err) {
        return next(err)
    }
}
