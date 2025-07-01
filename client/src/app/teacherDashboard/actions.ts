
'use server';

import { improveCourseContent, type ImproveCourseContentInput } from '@/ai/flows/improve-course-content';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';


const ImproveCourseContentInputSchema = z.object({
  courseTitle: z.string(),
  courseContent: z.string(),
  studentFeedback: z.string(),
  performanceData: z.string(),
});

export async function getImprovedContent(data: ImproveCourseContentInput) {
    const validatedData = ImproveCourseContentInputSchema.safeParse(data);

    if (!validatedData.success) {
        return { success: false, error: 'Invalid input data.' };
    }

    try {
        const result = await improveCourseContent(validatedData.data);
        return { success: true, data: result };
    } catch (error) {
        console.error('AI content improvement failed:', error);
        return { success: false, error: 'An unexpected error occurred while generating suggestions.' };
    }
}

const CreateCourseSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
    content: z.string().optional(),
});

export type CreateCourseState = {
    errors?: {
        title?: string[];
        description?: string[];
        content?: string[];
    };
    message?: string | null;
};

export async function createCourse(prevState: CreateCourseState, formData: FormData): Promise<CreateCourseState> {
    const validatedFields = CreateCourseSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to create course. Please check the fields.',
        };
    }

    const { title, description, content } = validatedFields.data;

    try {
        const newCourse: Course = {
            id: `C${String(courses.length + 1).padStart(3, '0')}`,
            title,
            description,
            content: content || '',
            studentCount: 0,
            status: 'Draft',
            thumbnail: 'https://placehold.co/600x400',
        };
        
        courses.push(newCourse);

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Course.',
        };
    }
    
    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses');
}
