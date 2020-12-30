import { Document } from 'mongoose'

export default interface IRefreshToken extends Document {
    userId: String,
    refreshToken: String,
    userAgent: String,
    createdAt?: Date,
    updatedAt?: Date
}
