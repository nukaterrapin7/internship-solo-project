'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks'); // Replace with your actual API endpoint
      if (response.ok) {
        const data: Task[] = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
      <h1 className="mt-4 text-2xl">Tasks</h1>
      <ul className="mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="border p-4 mb-4 rounded">
              <h2 className="text-lg font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Status: <strong>{task.status}</strong></p>
              <p className="text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(task.updatedAt).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <p>No tasks available. Add a new one!</p>
        )}
      </ul>
    </div>
  );
};

export default TasksPage;
