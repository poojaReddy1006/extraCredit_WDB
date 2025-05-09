const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: String,
  title: String,
  completed: Boolean,
}, { collection: 'tasks' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; 
