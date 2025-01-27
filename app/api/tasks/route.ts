import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createTaskSchema, editedTaskSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newTask = await prisma.task.create({
        data: {title:body.title}
    })

    return NextResponse.json(newTask, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('id');

  if (taskId) {
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(taskId) },
      });

      if (task) {
        return NextResponse.json(task);
      } else {
        return NextResponse.json({ error: 'Task not found' }, { status: 404});
      }
    } catch (error) {
      console.error('Erorr fetching task by ID:', error);
      return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
    }
  } else{
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
  }
};

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const id = Number(body.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const validation = editedTaskSchema.safeParse({ ...body, id }); // Pass the id as a number

  if (!validation.success) {
    console.error("Validation failed:", validation.error);
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const { title } = validation.data;

    const editedTask = await prisma.task.update({
      where: { id: id },
      data: { title: title },
    });

    return NextResponse.json(editedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
      const { id } = await request.json();

      if (!id) {
          return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
      }

      const deletedTask = await prisma.task.delete({
          where: { id: Number(id) },
      });

      return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
      console.error('Error deleting task:', error);
      return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}