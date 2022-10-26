const User = require('../models/user');

exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      userId: user._id,
      messages: user.messages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error getting messages' });
  }
};

exports.postMessage = async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body;
  try {
    const user = await User.findById(userId);
    user.messages.push({ message });
    await user.save();
    res.status(200).json({
      userId: user._id,
      messages: user.messages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error posting message' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User();
    await user.save();
    res.status(200).json({
      message: 'User created',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};
