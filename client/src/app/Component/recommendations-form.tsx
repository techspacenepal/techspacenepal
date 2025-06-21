

"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalizedCourseRecommendations } from "@/ai/flows/personalized-course-recommendations";
import type { PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
import { mockStudent } from "@/lib/data"; // For studentId
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";

const recommendationsSchema = z.object({
  courseHistory: z.string().min(50, "Please provide a more detailed course history (at least 50 characters)."),
  learningHabits: z.string().min(50, "Please describe your learning habits in more detail (at least 50 characters)."),
});

type RecommendationsFormData = z.infer<typeof recommendationsSchema>;

export function RecommendationsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<PersonalizedCourseRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecommendationsFormData>({
    resolver: zodResolver(recommendationsSchema),
    defaultValues: {
      courseHistory: "Completed 'Introduction to Programming' with an A. Currently taking 'Web Development Basics' and finding CSS challenging but enjoying JavaScript. Scored B in 'Database Fundamentals'. Interested in data science.",
      learningHabits: "Prefers hands-on projects and video tutorials over lengthy texts. Studies best in the evenings, dedicating about 2 hours per day. Enjoys collaborative learning but sometimes struggles with theoretical concepts without practical examples.",
    },
  });

  const onSubmit: SubmitHandler<RecommendationsFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await personalizedCourseRecommendations({
        studentId: mockStudent.id,
        courseHistory: data.courseHistory,
        learningHabits: data.learningHabits,
      });
      setRecommendations(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <Sparkles className="me-2" size={20} />
          <h5 className="mb-0">Get Personalized Recommendations</h5>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">
            Tell us about your academic journey and learning style, and we'll suggest courses tailored for you.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="courseHistory" className="form-label fw-medium">Your Course History & Performance</label>
              <textarea
                id="courseHistory"
                rows={5}
                className={`form-control ${errors.courseHistory ? "is-invalid" : ""}`}
                placeholder="E.g., Completed 'Python Basics' with A. Enjoyed 'Web Dev' but struggled with CSS..."
                {...register("courseHistory")}
              ></textarea>
              {errors.courseHistory && (
                <div className="invalid-feedback">{errors.courseHistory.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="learningHabits" className="form-label fw-medium">Your Learning Habits & Preferences</label>
              <textarea
                id="learningHabits"
                rows={5}
                className={`form-control ${errors.learningHabits ? "is-invalid" : ""}`}
                placeholder="E.g., Prefer hands-on projects, study at night..."
                {...register("learningHabits")}
              ></textarea>
              {errors.learningHabits && (
                <div className="invalid-feedback">{errors.learningHabits.message}</div>
              )}
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="me-2 spinner-border spinner-border-sm" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="me-2" size={16} />
                    Get Recommendations
                  </>
                )}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => reset()} disabled={isLoading}>
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2">
          <AlertTriangle size={18} />
          <div>{error}</div>
        </div>
      )}

      {recommendations && (
        <div className="card shadow-sm animate-fadeIn">
          <div className="card-header">
            <h5 className="mb-0">Your Personalized Recommendations</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <h6>Recommended Courses:</h6>
              {recommendations.recommendedCourses.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {recommendations.recommendedCourses.map((course, index) => (
                    <li key={index} className="list-group-item">{course}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No specific courses to recommend at this time based on the input.</p>
              )}
            </div>
            <div>
              <h6>Reasoning:</h6>
              <p className="text-muted white-space-pre-line">{recommendations.reasoning}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
