import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_REFRESH_SECRET } from '../../config'
import { RefreshToken } from '../../models'
import { BadRequestError, UnauthorizedError } from '../../customError'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) return next(new BadRequestError('"refreshToken" is required!'))
        try {
            jwt.verify(refreshToken, JWT_REFRESH_SECRET)
        } catch (err) {
            return next(new UnauthorizedError('Invalid Authorization token!'))
        }
        const activeSessions = await RefreshToken.find({ userId: req.user?._id }, { userId: 0 })
        res.json(activeSessions.map(session => ({
            _id: session._id,
            userAgent: session.userAgent,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            isCurrent: refreshToken === session.refreshToken
        })))
        return next()
    } catch (err) {
        return next(err)
    }
}
