// import mongoose from 'mongoose';

// const classSchema = new mongoose.Schema({
//   title: String,
//   date: String,
//   time: String,
//   duration: String,
//   imageUrl: String
// });

// export default mongoose.model("Class", classSchema);
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  duration: String,
  imageUrl: String,
  // Array of objects for multiple second schedules
  secondSchedules: [
    {
      secondDate: String,
      secondTime: String,
      _id: false, // optional, prevent auto _id generation
    },
  ],
}, { timestamps: true });

export default mongoose.model("Class", classSchema);

