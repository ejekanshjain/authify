import express from 'express'
import cors from 'cors'

import { NODE_ENV, PORT, JWT_SECRET } from './config'
import './db/MongoDB'
import auth from './middlewares/auth'
import routes from './routes/routes'
import { customErrorHandler } from './customError'

const app = express()

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}))
app.use(express.json())
app.use(auth({ secret: JWT_SECRET }).unless({
    path: [
        {
            method: 'GET',
            url: '/'
        },
        {
            method: 'POST',
            url: '/auth'
        },
        {
            method: 'POST',
            url: '/token'
        },
        {
            method: 'POST',
            url: '/validateToken'
        }
    ]
}))
app.use('/', routes)
app.use(customErrorHandler)

app.listen(
    PORT,
    () => console.log(
        `${NODE_ENV.charAt(0).toUpperCase() + NODE_ENV.slice(1)} Server Started on Port ${PORT}...`
    )
)
