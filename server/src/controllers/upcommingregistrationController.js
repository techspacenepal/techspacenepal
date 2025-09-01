import Registration from "../models/upcommingRegister.js";

// Create registration
export const createRegistration = async (req, res) => {
  try {
    const { fullName, email, phone, course, date, time } = req.body;

    if (!fullName || !email || !phone || !course || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReg = new Registration({ fullName, email, phone, course, date, time });
    await newReg.save();

    res.status(201).json({ message: "Registration successful", registration: newReg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all registrations (optional for admin)
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await Registration.findByIdAndDelete(id);

    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
