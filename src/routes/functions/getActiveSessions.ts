import { Request, Response, NextFunction } from 'express'

import { RefreshToken } from '../../models'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activeSessions = await RefreshToken.find({ userId: req.user?._id }, { refreshToken: 0, userId: 0 })
        res.json(activeSessions)
        return next()
    } catch (err) {
        return next(err)
    }
}
