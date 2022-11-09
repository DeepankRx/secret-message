const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/secret-message', {
  useNewUrlParser: true,
});
app.use(express.json());
mongoose.connection.on('connected', () => {
  console.log('Connected to database secret-message');
});
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Error connecting to database: ' + err);
  }
});
app.use('/api/user', userRoutes);

const port = 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
