const mongoose = require('mongoose');
const password= "Zffw2uw6EAdFJU18";

async function connectDB() {
  try {
    const connection = await mongoose.connect(`mongodb+srv://22054440:${password}@cluster0.z88or.mongodb.net/Chess`);
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);

  }
}

module.exports = connectDB;