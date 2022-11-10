const Stats = require('../models/stats');

exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    if (!stats) {
      const stat = new Stats({
        numberOfVisits: 1,
      });
      await stat.save();
    }
    stats.numberOfVisits = stats.numberOfVisits + 1;
    await stats.save();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
