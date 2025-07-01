import AddTeacherCourseForm from "@/app/auth/admin/addTeacherCourses/page";


export default function CreateCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create a New Course</h1>
        <p className="text-muted-foreground">
          Fill in the details below to set up your new course. You can publish it later.
        </p>
      </div>
      <AddTeacherCourseForm/>
    </div>
  );
}
