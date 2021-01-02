import { Router } from 'express'

import {
    welcome,
    signIn,
    signOut,
    getUserProfile,
    updateUserProfile,
    refreshToken,
    getActiveSessions,
    removeActiveSession,
    changePassword,
    getRoles,
    getUsers,
    validateToken
} from './functions'
import authAdmin from '../middlewares/authAdmin'

const router = Router()

router.get('/', welcome)
router.post('/auth', signIn)
router.delete('/auth', signOut)
router.get('/profile', getUserProfile)
router.patch('/profile', updateUserProfile)
router.post('/token', refreshToken)
router.post('/sessions', getActiveSessions)
router.delete('/sessions/:id', removeActiveSession)
router.patch('/password', changePassword)
router.get('/roles', authAdmin, getRoles)
router.get('/users', authAdmin, getUsers)
router.post('/validateToken', validateToken)

export default router
