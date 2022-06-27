const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const {email, password} = req.body;

      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      
    } catch (error) {
      
    }
  }

  async logout(req, res, next) {
    try {
      
    } catch (error) {
      
    }
  }

  async refresh(req, res, next) {
    try {
      
    } catch (error) {
      
    }
  }

  async activate(req, res, next) {
    try {
        const activationLink = req.params.link;
        await userService.activate(activationLink);
        return res.redirect('https://github.com/Honchar007');
    } catch (e) {
        next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['123','435']);
    } catch (error) {
      
    }
  }
}

module.exports = new UserController();