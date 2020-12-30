import { Request, Response, NextFunction } from 'express'

import { RefreshToken } from '../../models'
import { BadRequestError } from '../../customError'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) return next(new BadRequestError('"refreshToken" is required!'))
        await RefreshToken.deleteOne({ refreshToken })
        res.sendStatus(204)
        return next()
    } catch (err) {
        return next(err)
    }
}
