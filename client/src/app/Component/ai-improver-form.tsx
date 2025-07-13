'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { courses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import type { ImproveCourseContentOutput } from '@/ai/flows/improve-course-content';

import { Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { getImprovedContent } from '../auth/Dashboard/teacherDashboard/actions';

const formSchema = z.object({
  courseId: z.string().min(1, 'Please select a course.'),
  courseContent: z.string().min(50, 'Course content must be at least 50 characters.'),
  studentFeedback: z.string().min(20, 'Student feedback must be at least 20 characters.'),
  performanceData: z.string().min(20, 'Performance data must be at least 20 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AiImproverForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImproveCourseContentOutput | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: '',
      courseContent: '',
      studentFeedback: '',
      performanceData: '',
    },
  });

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = courses.find((c) => c.id === e.target.value);
    if (selectedCourse) {
      setValue('courseId', selectedCourse.id);
      setValue('courseContent', selectedCourse.content || '');
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);

    const selectedCourse = courses.find((c) => c.id === values.courseId);
    if (!selectedCourse) {
      toast.error('Selected course not found.');
      setIsLoading(false);
      return;
    }

    const response = await getImprovedContent({
      courseTitle: selectedCourse.title,
      courseContent: values.courseContent,
      studentFeedback: values.studentFeedback,
      performanceData: values.performanceData,
    });

    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
      toast.success('Suggestions generated successfully!');
    } else {
      toast.error(response.error || 'Failed to get suggestions.');
    }
  };

  return (
    <div className="row g-4">
      {/* Left: Form */}
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Improve Course Content</h5>
            <small className="text-muted">
              Select a course and provide feedback to get AI-powered suggestions.
            </small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="vstack gap-3">
              <div>
                <label className="form-label">Select Course</label>
                <select
                  className={`form-select ${errors.courseId ? 'is-invalid' : ''}`}
                  {...register('courseId')}
                  onChange={handleCourseChange}
                >
                  <option value="">Select a course to improve</option>
                  {courses.map((course: Course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.courseId && <div className="invalid-feedback">{errors.courseId.message}</div>}
              </div>

              <div>
                <label className="form-label">Course Content</label>
                <textarea
                  rows={6}
                  className={`form-control ${errors.courseContent ? 'is-invalid' : ''}`}
                  placeholder="The current content of the course module or lesson."
                  {...register('courseContent')}
                />
                {errors.courseContent && <div className="invalid-feedback">{errors.courseContent.message}</div>}
              </div>

              <div>
                <label className="form-label">Student Feedback</label>
                <textarea
                  rows={4}
                  className={`form-control ${errors.studentFeedback ? 'is-invalid' : ''}`}
                  placeholder="e.g., 'Students found TCP/IP confusing.' or 'Enjoyed the hands-on labs.'"
                  {...register('studentFeedback')}
                />
                {errors.studentFeedback && <div className="invalid-feedback">{errors.studentFeedback.message}</div>}
              </div>

              <div>
                <label className="form-label">Performance Data</label>
                <textarea
                  rows={4}
                  className={`form-control ${errors.performanceData ? 'is-invalid' : ''}`}
                  placeholder="e.g., 'Quiz 3 avg score was 65%.' or 'High engagement on module 2.'"
                  {...register('performanceData')}
                />
                {errors.performanceData && <div className="invalid-feedback">{errors.performanceData.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
                <Sparkles size={16} className="me-2" />
                Generate Suggestions
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Result */}
      <div className="col-md-6">
        <div className="card h-100">
          <div className="card-header">
            <h5 className="mb-0">AI-Generated Suggestions</h5>
            <small className="text-muted">
              Suggestions based on feedback and performance data.
            </small>
          </div>
          <div className="card-body">
            {isLoading && (
              <div className="vstack gap-2">
                <div className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                </div>
                <div className="placeholder-glow">
                  <span className="placeholder col-12"></span>
                </div>
                <div className="placeholder-glow">
                  <span className="placeholder col-10"></span>
                </div>
              </div>
            )}

            {!isLoading && result && (
              <pre className="text-body" style={{ whiteSpace: 'pre-wrap' }}>
                {result.suggestions}
              </pre>
            )}

            {!isLoading && !result && (
              <div className="text-muted text-center p-5  border-2 border-dashed rounded">
                <Sparkles size={32} className="mb-3" />
                <p className="mb-0">Your improvement suggestions will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
