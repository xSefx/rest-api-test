const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../model/model');
const ApiError = require('../error/apiError');
const { subscription } = require('../webSocket/subscription');

class UserService {
  async registerUser({ email, password }) {
    if (!email || !password) {
      throw ApiError.sendError(400, 'Введены некоректные данные.');
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.sendError(406, 'Пользователь с таким email уже создан.');
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, password: hashPassword });

    const token = jwt.sign({ id: user.id, email }, process.env.SECRET_KEY, {
      expiresIn: '12h',
    });

    return token;
  }

  async loginUser({ email, password }) {
    if (!email || !password) {
      throw ApiError.sendError(400, 'Введены некоректные данные.');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.sendError(400, 'Неверный логин или пароль.');
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw ApiError.sendError(400, 'Неверный логин или пароль.');
    }

    const token = jwt.sign({ id: user.id, email }, process.env.SECRET_KEY, {
      expiresIn: '12h',
    });

    return token;
  }

  subscribe(userId) {
    subscription.subscribeUser = userId;
  }

  unsubscribe(userId) {
    subscription.unUbscribeUser = userId;
  }

  getAll(userId) {
    const list = subscription.getSubscribeList;
    return list;
  }
}

module.exports = new UserService();
