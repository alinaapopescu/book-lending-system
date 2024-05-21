const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const prizeRoutes = require('./routes/prizeRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
 
app.use(cors());
app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);
app.use('/prizes', prizeRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
