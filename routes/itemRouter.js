const router = require('express').Router();

const ItemController = require('../controller/item.controller');
const authMiddleware = require('../middleware/userAuth');

router
  .route('/')
  .get(ItemController.getItems)
  .post(authMiddleware, ItemController.createItem);

router
  .route('/:id')
  .patch(authMiddleware, ItemController.updateItem)
  .delete(authMiddleware, ItemController.deleteItem);

module.exports = router;
