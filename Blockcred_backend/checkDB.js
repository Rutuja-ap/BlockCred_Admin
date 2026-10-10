require("dotenv").config();
const mongoose = require("mongoose");
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB:", mongoose.connection.name);
  const list = await mongoose.connection.collection("students").find({}).toArray();
  list.forEach((s) => console.log(s.email, "| studentId:", s.studentId, "| hasPassword:", !!s.password));
  process.exit();
})();