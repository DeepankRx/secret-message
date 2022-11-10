const User = require('../models/user');
const Stats = require('../models/stats');
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
    const stats = await Stats.findOne();
    if (!stats) {
      const stat = new Stats({
        numberOfMessages: 1,
      });
      await stat.save();
    }
    stats.numberOfMessages = stats.numberOfMessages + 1;
    await stats.save();
    const user = await User.findById(userId);
    user.messages.push({ message });
    await user.save();
    res.status(200).json({
      message: 'Message sent',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error posting message' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Please enter a name' });
    }
    const user = await User({
      name,
    });
    await user.save();
    const stats = await Stats.findOne();
    if (!stats) {
      const stat = new Stats({
        numberOfUsers: 1,
      });
      await stat.save();
    }
    stats.numberOfUsers = stats.numberOfUsers + 1;
    await stats.save();
    res.status(200).json({
      message: 'User created',
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: 'Please enter a user id' });
  }
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error getting user' });
  }
};
