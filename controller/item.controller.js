const ItemService = require('../services/item.service');
const FileService = require('../services/file.service');
const { sendNotify } = require('../webSocket/socketServer');

class ItemController {
  async createItem(req, res, next) {
    try {
      const { name, description } = req.body;
      const newItem = {
        name,
        description,
        userId: req.user.id,
      };

      if (req.files) {
        const fileName = await FileService.saveFile(req.files.file);

        newItem.file = fileName;
      }
      const item = await ItemService.create(newItem);
      sendNotify();
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async getItems(req, res, next) {
    try {
      const items = await ItemService.findAllItem();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const item = await ItemService.update(id, userId, req.body);
      res.status(200).json('Обновление прошло успешно');
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      await ItemService.delete(id, userId);
      res.status(200).json('Удаление прошло успешно');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();
