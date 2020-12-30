import { Request, Response, NextFunction } from 'express'

import { User } from '../../models'
import { BadRequestError } from '../../customError'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ _id: req.user?._id }, { password: 0 })
        if (!user) return next(new BadRequestError('User not found!'))
        res.json(user)
        return next()
    } catch (err) {
        return next(err)
    }
}
