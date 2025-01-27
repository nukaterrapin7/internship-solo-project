import { title } from 'process';
import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
});

export const editedTaskSchema = z.object({
    id: z.number().min(1, 'Task ID is required.'),
    title: z.string().min(1, 'Title is required.').max(255),
})