const router = require('express').Router();

const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');
const sockekRouter = require('./socketRouter');

router.use('/auth', userRouter);
router.use('/items', itemRouter);
router.use('/notification', sockekRouter)

module.exports = router;
