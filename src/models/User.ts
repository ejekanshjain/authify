import mongoose from 'mongoose'

import IUser from './types/user'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    details: {
        name: {
            firstName: {
                type: String,
                required: true,
                trim: true
            },
            lastName: {
                type: String,
                required: true,
                trim: true
            }
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other']
        },
        dateOfBirth: {
            type: Date,
            required: true
        }
    },
    role: {
        id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Role'
        },
        name: {
            type: String,
            required: true
        }
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    passwordUpdatedAt: Date
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', userSchema)
