import Service from '../models/Service.js';

// 📥 Get all services
export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// ➕ Create a new service
export const createService = async (req, res) => {
  const { title, desc, icon } = req.body;
  const newService = new Service({ title, desc, icon });
  await newService.save();
  res.status(201).json(newService);
};

// ❌ Delete a service
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

// 📝 Update/edit a service (✅ NEW CODE added only)
export const updateService = async (req, res) => {
  const { title, desc, icon } = req.body;
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { title, desc, icon },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update service." });
  }
};
