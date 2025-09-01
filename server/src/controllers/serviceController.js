import Service from "../models/Service.js";

// 📥 Get all services
export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// ➕ Create a new service (with file upload)
export const createService = async (req, res) => {
  try {
    const { title, desc, icon, heading, content } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // store relative path
    }

    const newService = new Service({
      title,
      desc,
      icon,
      heading,
      content,
      imageUrl,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

// ❌ Delete a service
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

// 📝 Update/edit a service (with optional file)
export const updateService = async (req, res) => {
  try {
    const { title, desc, icon, heading, content } = req.body;
    let updateData = { title, desc, icon, heading, content };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update service." });
  }
};
