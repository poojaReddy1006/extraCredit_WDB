const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - completed
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         completed:
 *           type: boolean
 *           description: The task completion status
 *       example:
 *         _id: 60c72b2f9b1e8b34d8f5c3d2
 *         title: Learn Swagger integration
 *         completed: false
 */


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("get");
    console.log(tasks);
    res.json(tasks);
  } catch (err) {
    console.log("get fail");
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', async (req, res) => {
  try {
    const lastTask = await Task.aggregate([
      {
        $addFields: {
          numericId: { $toInt: "$_id" }
        }
      },
      {
        $sort: { numericId: -1 }
      },
      {
        $limit: 1
      }
    ]);

    const lastNumericId = lastTask.length > 0 ? lastTask[0].numericId : 0;
    const newId = (lastNumericId + 1).toString();

    const newTask = new Task({
      _id: newId,
      title: req.body.title,
      completed: req.body.completed || false
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string  # Expecting ObjectId as a string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                _id:
 *                  type: string
 *                  readOnly: true
 *                title:
 *                  type: string
 *                completed:
 *                  type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
