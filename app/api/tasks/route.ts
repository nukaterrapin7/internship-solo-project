import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const creatTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.')
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = creatTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newTask = await prisma.task.create({
        data: {title:body.title, description: body.description}
    })

    return NextResponse.json(newTask, { status: 201 });
}