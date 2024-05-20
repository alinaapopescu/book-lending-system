const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
 
app.use(cors());
app.use(bodyParser.json());

// Middleware simplu pentru logare
app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`);
    next(); // Continuă execuția în lanțul de middleware
  });

  
app.use('/users', userRoutes);

// sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
//   });
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
