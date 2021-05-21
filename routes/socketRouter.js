const router = require('express').Router();
const app = require('../index');
const jwt = require('jsonwebtoken');

const { subscription } = require('../webSocket/subscription');

const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

router.ws('/', (ws, req) => {
  const { token } = req.query;
  console.log('Connect');

  ws.on('message', (msg) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      aWss.clients.forEach((client) => {
        const list = subscription.getSubscribeList;
        if (list.includes(decoded.id))
          client.send('Добавлен новый товар');
      })
    });
  });
});

module.exports = router;
