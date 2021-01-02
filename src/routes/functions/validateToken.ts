import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { BadRequestError, UnauthorizedError } from '../../customError'
import { JWT_SECRET } from '../../config'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body
        if (!token) return next(new BadRequestError('"token" is required!'))
        let decodedUser
        try {
            decodedUser = jwt.verify(token, JWT_SECRET)
        } catch (err) {
            return next(new UnauthorizedError('Invalid Authorization token!'))
        }
        res.json(decodedUser)
        return next()
    } catch (err) {
        return next(err)
    }
}
