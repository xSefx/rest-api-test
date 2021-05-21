const router = require('express').Router();
// const app = require('../index');
const { WSServer } = require('../webSocket/socketServer');

router.ws('/', (ws, req) => {
  const { token } = req.query;
  ws.tokenClient = token;
  console.log('Connect');
});

module.exports = router;
