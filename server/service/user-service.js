const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
  async registration(email, password) {
    try {
      const candidate = await UserModel.findOne({ email: 'email' });

      if (candidate) {
        throw new Error('This email had been already chosen');
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();

      const user = await UserModel.create({ email, password: hashPassword });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens( {...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
