import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { BadRequestError, ForbiddenError } from '../../customError'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../../config'
import { User, RefreshToken } from '../../models'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }, { password: 1, role: 1, active: 1 })
        const userAgent = req.headers['user-agent']
        if (!userAgent) return next(new ForbiddenError('No User Agent!'))
        if (!user) return next(new BadRequestError('Invalid email or password!'))
        if (!user.active) return next(new ForbiddenError('Your account has been suspended!'))
        if (!(await bcrypt.compare(password, user.password.toString()))) return next(new BadRequestError('Invalid email or password!'))
        const refreshToken = jwt.sign({
            _id: user._id,
            role: user.role
        }, JWT_REFRESH_SECRET)
        await RefreshToken.create({
            userId: user._id,
            refreshToken,
            userAgent
        })
        const iat = Math.floor(Date.now() / 1000)
        const exp = Math.floor(Date.now() / 1000) + (60 * 30) // 30 minutes
        const token = jwt.sign({
            iat,
            _id: user._id,
            role: user.role,
            exp
        }, JWT_SECRET)
        res.json({
            userId: user._id,
            role: user.role,
            token,
            refreshToken,
            issuedAt: iat,
            expiresAt: exp
        })
        return next()
    } catch (err) {
        return next(err)
    }
}
