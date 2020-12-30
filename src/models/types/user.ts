import { Document } from 'mongoose'

export default interface IUser extends Document {
    email: String,
    password: String,
    details: {
        name: {
            firstName: String,
            lastName: String,
        },
        gender: String,
        dateOfBirth: Date
    },
    role: {
        id: String,
        name: String
    },
    active?: Boolean,
    createdAt?: Date,
    updatedAt?: Date,
    passwordUpdatedAt?: Date
}
