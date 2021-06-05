const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const authenticatedMiddleware = require('../middlewares/auth')
const authorizeAdmin = require('../middlewares/authorizeAdmin')


router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEMail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot-password', userCtrl.forgotPassword)

router.post('/reset-password', authenticatedMiddleware, userCtrl.resetPassword) 

router.get('/logout', userCtrl.logout)

router.get('/infor', authenticatedMiddleware, userCtrl.getUserInfor)

router.put('/update-password', authenticatedMiddleware, userCtrl.updatePassword)

router.put('/update', authenticatedMiddleware, userCtrl.updateProfile)

// Admin
router.get('/all_infor', authenticatedMiddleware, authorizeAdmin, userCtrl.getUsersAllInfor)

router.get('/user/:id', authenticatedMiddleware, authorizeAdmin, userCtrl.getUserDetail)

router.put('/update_role/:id', authenticatedMiddleware, authorizeAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', authenticatedMiddleware, authorizeAdmin, userCtrl.deleteUser)

// // Social Login
router.post('/google_login', userCtrl.googleLogin)


module.exports = router