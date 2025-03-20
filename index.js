const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const feedback = require("./routes/feedback");
const adminRoutes = require("./routes/adminUsers");
const eventRoutes = require("./routes/adminEvents");
const equipmentRoutes = require("./routes/adminEquipment");

const frontendEvent = require("./routes/frontendEvents");
const frontendEquipment = require("./routes/frontendEquipment");



// ✅ Import the new equipment API route
const equipmentAPIRoute = require("./routes/frontendEquipment");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ✅ Existing Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedback);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/events", eventRoutes);
app.use("/api/admin/equipment", equipmentRoutes);

// ✅ User Routes
app.use("/api/user/getevent", frontendEvent);
app.use("/api/user/equipment", frontendEquipment);

// ✅ New Equipment API Route
app.use("/api/equipments", equipmentAPIRoute);



// ✅ Test Routes
app.get("/", (req, res) => {
  res.send("🏀 Sports Recommendation Platform Backend is Running 🚀");
});

app.get("/test-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies.token);
  res.json({ receivedCookies: req.cookies });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
