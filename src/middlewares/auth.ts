import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../customError'
import unless from 'express-unless'

declare module 'express' {
    export interface Request {
        user?: {
            _id?: String,
            role?: {
                id?: String,
                name?: String
            }
        }
    }
}

interface Options {
    secret: string
}

export default (options: Options) => {
    const middleware = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) return next(new UnauthorizedError('Authorization token is required!'))
        try {
            const decodedUser: any = jwt.verify(token, options.secret)
            req.user = {
                _id: decodedUser._id,
                role: {
                    id: decodedUser.role.id,
                    name: decodedUser.role.name
                }
            }
            next()
        } catch (err) {
            next(new UnauthorizedError('Invalid Authorization token!'))
        }
    }
    middleware.unless = unless
    return middleware
}
