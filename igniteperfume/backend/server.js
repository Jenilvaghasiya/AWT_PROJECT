const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');


dotenv.config();          // Load environment variables
connectDB();              // Connect to MongoDB

const app = express();

// ✅ Middleware
app.use(cors());          // Enable CORS for all origins
app.use(express.json());  // Parse incoming JSON requests

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/perfume', require('./routes/perfumeRoutes'));

// ✅ Static folder to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
