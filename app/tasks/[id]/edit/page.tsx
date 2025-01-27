"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditTaskPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks?id=${id}`);
      if (response.ok) {
        const task = await response.json();
        setTitle(task.title);
      }
    };

    fetchTask();
  }, [id]);

  const handleSave = async () => {
    console.log("Save button clicked");
    console.log('Sending PUT request to /api/tasks with data:', { id, title });
    
    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title }),
    });

    if (response.ok) {
      router.push("/tasks");
    } else {
      console.error("Failed to update task");
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="button" onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-2">
        Save
      </button>
    </div>
  );
};

export default EditTaskPage;
