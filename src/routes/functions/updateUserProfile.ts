import { Request, Response, NextFunction } from 'express'

import { User } from '../../models'
import { BadRequestError } from '../../customError'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, firstName, lastName, gender, dateOfBirth } = req.body
        const user = await User.findOne({ _id: req.user?._id }, { password: 0 })
        if (!user) return next(new BadRequestError('User not found!'))
        user.email = email
        user.details.name.firstName = firstName
        user.details.name.lastName = lastName
        user.details.gender = gender
        user.details.dateOfBirth = new Date(dateOfBirth)
        await user.save()
        res.sendStatus(200)
        return next()
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) return next(new BadRequestError('User with same email already exists!'))
        return next(err)
    }
}
