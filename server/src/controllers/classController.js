// import Class from "../models/Class.js";

// // 📥 POST - create
// export const createClass = async (req, res) => {
//   try {
//     const { title, date, time, duration } = req.body;
//     const imageUrl = "/uploads/" + req.file.filename;
//     const newClass = new Class({ title, date, time, duration, imageUrl });
//     await newClass.save();
//     res.status(201).json({ message: "Class created", data: newClass });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create class", error });
//   }
// };

// // 📤 GET - all
// export const getAllClasses = async (req, res) => {
//   try {
//     const classes = await Class.find().sort({ createdAt: -1 });
//     res.status(200).json(classes);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch classes" });
//   }
// };

// // ✏️ PUT - update
// export const updateClass = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     if (req.file) {
//       updates.imageUrl = "/uploads/" + req.file.filename;
//     }
//     const updated = await Class.findByIdAndUpdate(id, updates, { new: true });
//     res.json({ message: "Updated successfully", data: updated });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update", error });
//   }
// };

// // 🗑️ DELETE
// export const deleteClass = async (req, res) => {
//   try {
//     await Class.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete", error });
//   }
// };
import Class from "../models/Class.js";

// Create a new class
export const createClass = async (req, res) => {
  try {
    const { title, date, time, duration } = req.body;
    const imageUrl = req.file ? "/uploads/" + req.file.filename : null;
    const newClass = new Class({ title, date, time, duration, imageUrl });
    await newClass.save();
    res.status(201).json({ message: "Class created", data: newClass });
  } catch (error) {
    res.status(500).json({ message: "Failed to create class", error });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

// Update main class data
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.imageUrl = "/uploads/" + req.file.filename;
    }
    const updated = await Class.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};

// Add a new second time/date schedule
export const addSecondSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { secondDate, secondTime } = req.body;

    if (!secondDate || !secondTime) {
      return res.status(400).json({ message: "Second date and time are required" });
    }

    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (!classItem.secondSchedules) classItem.secondSchedules = [];

    classItem.secondSchedules.push({
      secondDate,
      secondTime,
    });

    await classItem.save();

    res.status(200).json({ message: "Second time and date added successfully", data: classItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to add second time and date", error });
  }
};

// Update a second time/date by index
export const updateSecondSchedule = async (req, res) => {
  try {
    const { id, index } = req.params;
    const { secondDate, secondTime } = req.body;

    if (!secondDate || !secondTime) {
      return res.status(400).json({ message: "Second date and time are required" });
    }

    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (!classItem.secondSchedules || classItem.secondSchedules.length <= index) {
      return res.status(404).json({ message: "Second schedule not found at given index" });
    }

    classItem.secondSchedules[index].secondDate = secondDate;
    classItem.secondSchedules[index].secondTime = secondTime;

    await classItem.save();

    res.status(200).json({ message: "Second time and date updated successfully", data: classItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update second time and date", error });
  }
};

// Delete a second time/date by index
export const deleteSecondSchedule = async (req, res) => {
  try {
    const { id, index } = req.params;

    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (!classItem.secondSchedules || classItem.secondSchedules.length <= index) {
      return res.status(404).json({ message: "Second schedule not found at given index" });
    }

    classItem.secondSchedules.splice(index, 1);

    await classItem.save();

    res.status(200).json({ message: "Second time and date deleted successfully", data: classItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete second time and date", error });
  }
};
