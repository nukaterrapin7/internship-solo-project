import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createTaskSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newTask = await prisma.task.create({
        data: {title:body.title, description: body.description}
    })

    return NextResponse.json(newTask, { status: 201 });
}

export async function GET() {
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