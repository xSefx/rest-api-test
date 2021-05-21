require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('./services/user.service');
const ItemService = require('./services/item.service');

const createUser = async (email, password) => {
  const userToken = await UserService.registerUser({ email, password });
  return userToken;
};

const createItem = async (name, description, token, file) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  await ItemService.create({ name, description, userId: decoded.id, file });
};

const seed = async () => {
  try {
    const user1 = await createUser('user123@mail.ru', '132');
    const user2 = await createUser('user2211qq@mail.ru', '132');

    await createItem('item1', 'desc item1', user1, '13213123.jpeg');
    await createItem('item2', 'desc item2', user2, '1559370578_1.jpg');
  } catch (error) {
    console.log(error.message);
  }
};

seed();
