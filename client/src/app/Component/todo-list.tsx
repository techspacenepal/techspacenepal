// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// type Role = 'teacher' | 'student' | 'admin';

// interface Todo {
//   _id: string;
//   userId: string;
//   role: Role;
//   text: string;
//   done: boolean;
// }

// interface TodoListProps {
//   role: Role;
//   userId: string;
// }

// export default function TodoList({ role, userId }: TodoListProps) {
//   const [tasks, setTasks] = useState<Todo[]>([]);
//   const [newTaskText, setNewTaskText] = useState<string>('');

//   useEffect(() => {
//     if (!userId) return;

//     const fetchTodos = async () => {
//       try {
//         const res = await axios.get<Todo[]>('http://localhost:5000/api/todos', {
//           params: { userId, role },
//         });
//         setTasks(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTodos();
//   }, [role, userId]);

//   const addTask = async () => {
//     const trimmedText = newTaskText.trim();
//     if (!trimmedText) return;

//     try {
//       const res = await axios.post<Todo>('http://localhost:5000/api/todos', { userId, role, text: trimmedText });
//       setTasks(prev => [...prev, res.data]);
//       setNewTaskText('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleTaskDone = async (id: string) => {
//     try {
//       const res = await axios.patch<Todo>(`http://localhost:5000/api/todos/toggle/${id}`);
//       setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/todos/${id}`);
//       setTasks(prev => prev.filter(t => t._id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') addTask();
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
//       <h3 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{role} To-Do List</h3>

//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Add new task..."
//           value={newTaskText}
//           onChange={(e) => setNewTaskText(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button className="btn btn-primary" onClick={addTask}>Add</button>
//       </div>

//       <ul className="list-group">
//         {tasks.length === 0 && <li className="list-group-item text-center text-muted">No tasks</li>}

//         {tasks.map((task) => (
//           <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//               <input
//                 type="checkbox"
//                 className="form-check-input me-2"
//                 checked={task.done}
//                 onChange={() => toggleTaskDone(task._id)}
//                 id={`task-${task._id}`}
//               />
//               <label
//                 htmlFor={`task-${task._id}`}
//                 style={{ textDecoration: task.done ? 'line-through' : 'none', cursor: 'pointer' }}
//               >
//                 {task.text}
//               </label>
//             </div>

//             <button
//               className="btn btn-sm btn-danger"
//               onClick={() => deleteTask(task._id)}
//               aria-label="Delete task"
//             >
//               &times;
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }





// app/Component/todo-list.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Role = 'teacher' | 'student' | 'admin';

interface Todo {
  _id: string;
  userId: string;
  role: Role;
  text: string;
  done: boolean;
}

interface TodoListProps {
  role: Role;
  userId: string;
}

export default function TodoList({ role, userId }: TodoListProps) {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');

  useEffect(() => {
    if (!userId) return;

    const fetchTodos = async () => {
      try {
        const res = await axios.get<Todo[]>('http://localhost:5000/api/todos', {
          params: { userId, role },
        });
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [role, userId]);

  const addTask = async () => {
    const trimmedText = newTaskText.trim();
    if (!trimmedText) return;

    try {
      const res = await axios.post<Todo>('http://localhost:5000/api/todos', {
        userId,
        role,
        text: trimmedText,
      });
      setTasks(prev => [...prev, res.data]);
      setNewTaskText('');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskDone = async (id: string) => {
    try {
      const res = await axios.patch<Todo>(
        `http://localhost:5000/api/todos/toggle/${id}`
      );
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3 style={{ textTransform: 'capitalize', textAlign: 'center' }}>
        {role === 'student' ? '🎓 Student To-Do List' : '👨‍🏫 Teacher To-Do List'}
      </h3>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {tasks.length === 0 && (
          <li className="list-group-item text-center text-muted">No tasks</li>
        )}

        {tasks.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.done}
                onChange={() => toggleTaskDone(task._id)}
                id={`task-${task._id}`}
              />
              <label
                htmlFor={`task-${task._id}`}
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {task.text}
              </label>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(task._id)}
              aria-label="Delete task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
