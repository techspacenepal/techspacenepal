'use server';

/**
 * @fileOverview An AI tool that suggests improvements to course content based on student feedback and performance data.
 *
 * - improveCourseContent - A function that handles the course content improvement process.
 * - ImproveCourseContentInput - The input type for the improveCourseContent function.
 * - ImproveCourseContentOutput - The return type for the improveCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveCourseContentInputSchema = z.object({
  courseTitle: z.string().describe('The title of the course.'),
  courseContent: z.string().describe('The content of the course that needs improvement.'),
  studentFeedback: z.string().describe('Student feedback on the course content.'),
  performanceData: z.string().describe('Student performance data on the course content.'),
});
export type ImproveCourseContentInput = z.infer<typeof ImproveCourseContentInputSchema>;

const ImproveCourseContentOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions for improving the course content.'),
});
export type ImproveCourseContentOutput = z.infer<typeof ImproveCourseContentOutputSchema>;

export async function improveCourseContent(input: ImproveCourseContentInput): Promise<ImproveCourseContentOutput> {
  return improveCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveCourseContentPrompt',
  input: {schema: ImproveCourseContentInputSchema},
  output: {schema: ImproveCourseContentOutputSchema},
  prompt: `You are an AI tool that suggests improvements to course content based on student feedback and performance data.

  Course Title: {{{courseTitle}}}
  Course Content: {{{courseContent}}}
  Student Feedback: {{{studentFeedback}}}
  Performance Data: {{{performanceData}}}

  Based on the course content, student feedback, and performance data, provide suggestions for improving the course content.`,}
);

const improveCourseContentFlow = ai.defineFlow(
  {
    name: 'improveCourseContentFlow',
    inputSchema: ImproveCourseContentInputSchema,
    outputSchema: ImproveCourseContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
