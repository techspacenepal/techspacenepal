import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
  try {
    const { userId, role } = req.query;
    if (!userId || !role) return res.status(400).json({ message: 'Missing userId or role' });

    const todos = await Todo.find({ userId, role });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { userId, role, text } = req.body;
    if (!userId || !role || !text) return res.status(400).json({ message: 'Missing required fields' });

    const todo = new Todo({ userId, role, text });
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleDone = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.done = !todo.done;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};





export const getStudentTodos = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (!studentId) return res.status(400).json({ message: 'Missing studentId' });

    const todos = await Todo.find({ userId: studentId, role: "student" });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addStudentTodo = async (req, res) => {
  try {
    const { studentId, text } = req.body;
    if (!studentId || !text) return res.status(400).json({ message: 'Missing fields' });

    const todo = new Todo({ userId: studentId, role: "student", text });
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};