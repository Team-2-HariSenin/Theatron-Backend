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
      const { name, email, oldPassword, newPassword } = req.body;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (oldPassword && newPassword) {
        // Verifikasi oldPassword
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash newPassword
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }

      // Update name and email
      if (name) user.name = name;
      if (email) user.email = email;

      await user.save();

      const updatedUser = await User.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
