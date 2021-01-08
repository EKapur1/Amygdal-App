const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const app = express();
app.use(cors());

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

// Define routes
app.use('/api/registration', require('./routes/api/registration'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/category', require('./routes/api/category'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
