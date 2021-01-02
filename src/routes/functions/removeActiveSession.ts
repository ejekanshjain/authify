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
        await RefreshToken.deleteOne({ _id: req.params.id, refreshToken: { $ne: refreshToken } })
        res.sendStatus(200)
        return next()
    } catch (err) {
        return next(err)
    }
}
