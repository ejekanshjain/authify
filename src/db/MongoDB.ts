import mongoose from 'mongoose'

import { MONGODB_URL } from '../config'

mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

module.exports = mongoose.connection
