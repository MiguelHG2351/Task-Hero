import express from 'express'
import path from 'path'
import cors from 'cors'

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '../.env') })
}

import auth, { login, currentUser } from './auth'

export const app = express()

// Middlewares
app.use(cors())
app.use('/static', express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(auth)

// Auth Routes
app.post('/api/login', login)
app.get('/api/user/current', currentUser)

export default app
