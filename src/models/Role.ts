import mongoose from 'mongoose'

import IRole from './types/role'

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IRole>('Role', RoleSchema)
