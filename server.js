require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

const Allrouter = require('./routes/index');
app.use(Allrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});