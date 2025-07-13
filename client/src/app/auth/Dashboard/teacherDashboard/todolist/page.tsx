// 'use client';

// import React, { useEffect, useState } from 'react';
// import TodoList from '@/app/Component/todo-list';

// const TodolistPage = () => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log('useEffect called');

//     // Try to get teacherId directly
//     const teacherId = localStorage.getItem('teacherId');
//     if (teacherId && teacherId !== 'undefined') {
//       setUserId(teacherId);
//     } else {
//       console.warn('No teacherId found in localStorage');
//       setUserId(null);
//     }

//     setLoading(false);
//   }, []);

//   console.log('Current userId:', userId);

//   if (loading) return <div>Loading...</div>;
//   if (!userId) return <div>No user logged in</div>;

//   return <TodoList role="teacher" userId={userId} />;
// };

// export default TodolistPage;


'use client';

import React, { useEffect, useState } from 'react';
import TodoList from '@/app/Component/todo-list';

const TeacherTodolistPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teacherId = localStorage.getItem('teacherId');
    if (teacherId && teacherId !== 'undefined') {
      setUserId(teacherId);
    } else {
      setUserId(null);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userId) return <div>No teacher logged in</div>;

  return <TodoList role="teacher" userId={userId} />;
};

export default TeacherTodolistPage;
