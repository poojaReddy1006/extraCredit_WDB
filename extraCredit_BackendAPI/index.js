const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const app = express();
const PORT = 7128;

app.use(express.json());

const corsOptions = {
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// MongoDB Connection
console.log("Starting the server...");
mongoose.connect('mongodb+srv://pooja:Education%401@cluster0.xw8x3l3.mongodb.net/TaskManagement?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => console.error('MongoDB connection error:', err));


// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API to manage tasks (create, read, update, delete)',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.redirect('/docs');
});

app.get('/api', (req, res) => {
  res.redirect('/docs');
});


// Routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
