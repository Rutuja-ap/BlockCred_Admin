require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const col = mongoose.connection.collection("students");
  const list = await col.find({}).toArray();
  for (const s of list) {
    await col.updateOne(
      { _id: s._id },
      { $set: { password: await bcrypt.hash(s.studentId, 10) } }
    );
  }
  console.log("updated:", list.length);
  process.exit();
})();