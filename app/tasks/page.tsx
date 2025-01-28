'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Flex } from '@radix-ui/themes';

type Task = {
  id: number;
  title: string;
  createdAt: string;
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortType, setSortType] = useState<'title' | 'date'>('date');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (!storedUser) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTasks = async () => {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data: Task[] = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks');
        }
      };

      fetchTasks();
    }
  }, [isAuthenticated]);

  const sortTasks = (tasks: Task[], sortType: 'title' | 'date') => {
    const tasksCopy = [...tasks];
    if (sortType === 'title') {
      return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'date') {
      return tasksCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return tasksCopy;
  };

  const handleSortChange = (newSortType: 'title' | 'date') => {
    setSortType(newSortType);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } else {
      console.error('Failed to delete task');
    }
  };

  if (loading || isAuthenticated === null) {
    return null;
  }

  return (
    <div>
      <Flex gap="3">
        <Button>
          <Link href="/tasks/new">New Task</Link>
        </Button>
        <Button onClick={() => handleSortChange('title')}>Sort by Title</Button>
        <Button onClick={() => handleSortChange('date')}>Sort by Date</Button>
      </Flex>
      <h1 className="mt-4 text-2xl">Tasks</h1>
      <ul className="mt-4">
        {tasks.length > 0 ? (
          sortTasks(tasks, sortType).map((task) => (
            <li key={task.id} className="border p-4 mb-4 rounded">
              <h2 className="text-lg font-bold">{task.title}</h2>
              <p className="text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
              <Flex gap="3">
                <Button color="indigo">
                  <Link href={`/tasks/${task.id}/edit`}>Edit Task</Link>
                </Button>
                <Button onClick={() => handleDelete(task.id)} color="red">
                  Delete
                </Button>
              </Flex>
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
