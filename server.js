const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const authorRoutes = require('./routes/authorRoutes');
const helmet = require("helmet");
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB', error));


app.use(cors({
  origin: ['https://blog-post-fe-psi.vercel.app/', 'http://localhost:3000'],
  credentials: true
}));


app.use(helmet());


const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 10000, 
  max: 10000 
}));

app.use('/api', postRoutes);
app.use('/api', authorRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

