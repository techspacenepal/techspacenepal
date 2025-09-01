import Stat from '../models/statModel.js';

export const getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const createStat = async (req, res) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json(stat);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create stat' });
  }
};

export const updateStat = async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(stat);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update stat' });
  }
};

export const deleteStat = async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete stat' });
  }
};
