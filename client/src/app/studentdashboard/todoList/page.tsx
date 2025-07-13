'use client';

import React, { useEffect, useState } from 'react';
import TodoList from '@/app/Component/todo-list';

const StudentTodolistPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('✅ useEffect called in StudentTodolistPage');

    const studentId = localStorage.getItem('studentId');
    console.log('🔍 localStorage studentId:', studentId);

    if (studentId && studentId !== 'undefined' && studentId !== 'null') {
      setUserId(studentId);
    } else {
      console.warn('⚠️ No valid studentId found in localStorage');
      setUserId(null);
    }

    setLoading(false);
  }, []);

  console.log('🧾 Current userId state:', userId);

  if (loading) return <div>⏳ Loading...</div>;
  if (!userId) return <div>❌ No student logged in</div>;

  return <TodoList role="student" userId={userId} />;
};

export default StudentTodolistPage;
