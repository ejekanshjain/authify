import { Document } from 'mongoose'

export default interface IRole extends Document {
    name: String,
    createdAt?: Date,
    updatedAt?: Date
}
