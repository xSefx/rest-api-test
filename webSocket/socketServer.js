const jwt = require('jsonwebtoken');
const app = require('../index');
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

const { subscription } = require('./subscription');

const sendNotify = () => {
  const list = subscription.getSubscribeList;
  aWss.clients.forEach((client) => {
    jwt.verify(client.tokenClient, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && list.includes(decoded.id)) {
        client.send('Добавлен новый товар');
      }
    });
  });
};

module.exports = { WSServer, sendNotify };
