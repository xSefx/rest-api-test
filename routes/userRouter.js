const router = require('express').Router();

const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/userAuth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/subscribe', authMiddleware, userController.subscribeUser);
router.get('/unsubscribe', authMiddleware, userController.unsubscribeUser);
router.get('/list', userController.getAll);


module.exports = router;
