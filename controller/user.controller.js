const UserService = require('../services/user.service');

class UserController {
  async register(req, res, next) {
    try {
      const token = await UserService.registerUser(req.body);
      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const token = await UserService.loginUser(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async subscribeUser(req, res, next) {
    try {
      const userId = req.user.id;
      await UserService.subscribe(userId);
      res.status(200).json('Пользователь подписался');
    } catch (error) {
      next(error);
    }
  }

  async unsubscribeUser(req, res, next) {
    try {
      const userId = req.user.id;
      await UserService.unsubscribe(userId);
      res.status(200).json('Пользователь отписался');
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const list = await UserService.getAll();
      res.status(200).json(list);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
