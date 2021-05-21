const path = require('path');
const uuid = require('uuid');

const ApiError = require('../error/apiError');

class FileService {
  async saveFile(file) {
    if(file.size > 1e6){
        throw ApiError.sendError(400, 'Размер файла превышает допустимый');
    }
    const fileName = uuid.v4() + file.name;
    const filePath = path.resolve(__dirname, '..', 'static', fileName);
    file.mv(filePath);
    return fileName;
  }
}

module.exports = new FileService();
