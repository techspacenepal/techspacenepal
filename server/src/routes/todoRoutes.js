import express from 'express';
import { getTodos, addTodo, deleteTodo, toggleDone, getStudentTodos, addStudentTodo } from '../controllers/todoController.js';
import Todo from "../models/Todo.js"

const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.patch('/toggle/:id', toggleDone);


router.get('/student', getStudentTodos);
router.post('/student', addStudentTodo);

router.get('/api/todos', async (req, res) => {
  const { userId, role } = req.query;
  if (!userId || !role) return res.status(400).send('Missing userId or role');
  
  const todos = await Todo.find({ userId, role });
  res.json(todos);
});

export default router;
