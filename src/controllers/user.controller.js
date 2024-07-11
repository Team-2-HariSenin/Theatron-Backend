const { user: User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  async getUserById(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findOne({ where: { id } });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const id = req.user.id;
      const { name, email, password } = req.body;
      const user = await User.findOne({ where: { id } });
      if (user) {
        const hashedPassword = password
          ? await bcrypt.hash(password, 10)
          : user.password;
        await user.update({ name, email, password: hashedPassword });
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
