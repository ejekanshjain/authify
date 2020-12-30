import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'

import { User } from '../../models'
import { BadRequestError } from '../../customError'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body
        if (currentPassword === newPassword) return next(new BadRequestError('New password cannot be same as current password!'))
        if (newPassword !== confirmPassword) return next(new BadRequestError('Passwords do not match!'))
        const user = await User.findOne({ _id: req.user?._id })
        if (!user) return next(new BadRequestError('User not found!'))
        if (!(await bcrypt.compare(currentPassword, user.password.toString()))) return next(new BadRequestError('Your password is invalid!'))
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        res.sendStatus(200)
        return next()
    } catch (err) {
        return next(err)
    }
}
