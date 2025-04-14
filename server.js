import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "mysecretkey";

// MongoDB connections
let userConnection, eventConnection;

try {
  userConnection = await mongoose.createConnection(
    "mongodb+srv://ramkumar007xx:ronaldo@eventcluster.dlwkrmu.mongodb.net/event1"
  ).asPromise();
  console.log("✅ Connected to User DB");

  eventConnection = await mongoose.createConnection(
    "mongodb+srv://ramkumar007xx:Ram%402003@cluster0.sdt7g.mongodb.net/Blogs"
  ).asPromise();
  console.log("✅ Connected to Event DB");
} catch (err) {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
}

// Schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,

});
const User = userConnection.model("User", userSchema);

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  place: String,
  time : String,
  locationUrl: String,
  seats: Number,
  price: Number,
  email: String,
  imageUrl : String
});
const Event = eventConnection.model("Event", eventSchema);

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Routes

// Signup
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: "User already exists" });

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new User({ email:username, password: hashedPass });
  await newUser.save();
  res.json({ message: "User created successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email, email: user.email }, JWT_SECRET);
  res.json({ token });
});

// Get profile (email)
app.get("/profile", authenticate, (req, res) => {
  res.json({ email: req.user.email });
});

// Create Event
app.post("/events", authenticate, async (req, res) => {
  const { title, description, date, place, seats, price,imageUrl,time,locationUrl } = req.body;
  const email = req.user.email;

  const newEvent = new Event({
    title,
    description,
    date,
    place,
    time,
    locationUrl,
    seats,
    price,
    imageUrl,
    email: req.user.email,
   
  });

  await newEvent.save();
  res.json({ message: "Event created successfully" });
});
app.get('/events', async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find();

    for (const event of events) {
      const eventDateTime = new Date(`${event.date}T${event.time || '00:00'}`);

      if (eventDateTime < now) {
        await Event.findByIdAndDelete(event._id);
      }
    }

    // Fetch remaining events after deletion
    const updatedEvents = await Event.find();
    res.json(updatedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


//Delete Events
app.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});
//Update Evenets
app.put("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});



// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
