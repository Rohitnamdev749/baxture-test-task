const User = require("../models/user.model");
class UserService {
  async create(data) {
    try{
      const user = new User({ ...data });
      await user.save();
      return user;
    }catch(err){
      throw new Error(err);
    }
  }
  async getUserList() {
    try {
      const list = await User.find({});
      return list;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getUserById(id){
    try{
      const user = await User.findOne({id:id});
      if(user){
        return user;
      }
      return null;
    }catch(err){
      throw new Error(err);
    }
  }
  async deleteUser(id){
    try{
      await User.deleteOne({id:id});
      return;
    }catch(err){
      throw new Error(err);
    }
  }
  async updateUser(id, data){
    try{
      const exitingUser = await this.getUserById(id);
      if(!exitingUser) return null;
      Object.assign(exitingUser,data);
      exitingUser.save();
      return exitingUser;
    }catch(err){
      throw new Error(err)
    }
  }
}

module.exports = new UserService();
