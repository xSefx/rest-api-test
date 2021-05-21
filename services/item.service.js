const ApiError = require('../error/apiError');
const { Item } = require('../model/model');

class ItemService {
  async create({ name, description, userId, file }) {
    if (!name) {
      throw ApiError.sendError(400, 'Введены некоректные данные.');
    }
    const newItem = await Item.create({ name, description, userId, file });
    return newItem;
  }

  async findAllItem() {
    const items = await Item.findAll();
    return items;
  }

  async update(id, userId, { name, description }) {
    if (!name) {
      throw ApiError.sendError(400, 'Введены некоректные данные.');
    }

    const item = await Item.findOne({ where: { id } });
    if (!item) {
      throw ApiError.sendError(404, 'Не найдено');
    }
    if (item.userId !== userId) {
      throw ApiError.sendError(403, 'Нет доступа');
    }

    await Item.update({ name, description }, { where: { id, userId } });
  }

  async delete(id, userId) {
    const item = await Item.findOne({ where: { id } });
    if (!item) {
      throw ApiError.sendError(404, 'Не найдено');
    }
    if (item.userId !== userId) {
      throw ApiError.sendError(403, 'Нет доступа');
    }
    await Item.destroy({ where: { id, userId } });
  }
}

module.exports = new ItemService();
