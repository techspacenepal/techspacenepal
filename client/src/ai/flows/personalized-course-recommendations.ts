// src/ai/flows/personalized-course-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized course recommendations to students based on their performance and learning habits.
 *
 * - personalizedCourseRecommendations - A function that returns personalized course recommendations.
 * - PersonalizedCourseRecommendationsInput - The input type for the personalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the personalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';


const PersonalizedCourseRecommendationsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  courseHistory: z.string().describe('A summary of the student\'s course history, including grades and performance.'),
  learningHabits: z.string().describe('A description of the student\'s learning habits and preferences.'),
});

export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('A list of recommended courses for the student.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the course recommendations.'),
});

export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function personalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {
    schema: PersonalizedCourseRecommendationsInputSchema,
  },
  output: {
    schema: PersonalizedCourseRecommendationsOutputSchema,
  },
  prompt: `You are an AI assistant that provides personalized course recommendations to students.

  Based on the student's course history and learning habits, recommend courses that the student is likely to find interesting and succeed in.

  Student ID: {{{studentId}}}
  Course History: {{{courseHistory}}}
  Learning Habits: {{{learningHabits}}}

  Format your response as a JSON object.
  `, // Ensure output is valid JSON
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
