const User = require("../../models/user");

const GetUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    const response = {
      success: true,
      users,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false });
  }
};
const deleteUser = async (req, res) => {
  const id = req.body.id;
  try {
    const admin = await User.findOne({ _id: id });
    if (admin.admin)
      return res.status(200).json({ success: false, admin: true });

    await User.deleteOne({ _id: id });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
const addUser = async (req, res) => {
  const data = req.body;
  try {
    const name = data.name,
      surname = data.surname;
    (email = data.email), (password = data.password), (admin = data.admin);

    await new User({ name, surname, email, password, admin }).save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
module.exports = { GetUsers, deleteUser, addUser };
