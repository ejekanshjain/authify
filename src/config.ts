import dotenv from 'dotenv'

const NODE_ENV = process.env.NODE_ENV ?? 'development'

if (NODE_ENV !== 'production') {
    dotenv.config()
}

const PORT = Number(process.env.PORT ?? 5000)
const MONGODB_URL = process.env.MONGODB_URL ?? 'mongodb://localhost:27017'
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'refresh secret'

export {
    NODE_ENV,
    PORT,
    MONGODB_URL,
    JWT_SECRET,
    JWT_REFRESH_SECRET
}
