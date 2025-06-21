// import { PageHeader } from "@/app/Component/page-header";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { mockGradebook } from "@/lib/data";
// import { TrendingUp, CheckCircle, Clock } from "lucide-react";

// export default function GradebookPage() {
//   const grades = mockGradebook;

//   const getGradeBadgeVariant = (grade: string) => {
//     if (grade.startsWith('A')) return 'default'; // primary
//     if (grade.startsWith('B')) return 'secondary';
//     if (grade.startsWith('C')) return 'outline'; // needs custom styling for yellow/orange
//     if (grade.startsWith('D') || grade.startsWith('F')) return 'destructive';
//     return 'outline';
//   };


//   return (
//     <>
//       <PageHeader
//         title="Gradebook"
//         description="Track your academic performance and progress across all courses."
//       />
//       {grades.length > 0 ? (
//         <Table>
//           <TableCaption>A summary of your course grades and progress.</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[40%]">Course Name</TableHead>
//               <TableHead className="text-center">Grade</TableHead>
//               <TableHead className="text-center w-[30%]">Progress</TableHead>
//               <TableHead className="text-center">Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {grades.map((entry) => (
//               <TableRow key={entry.courseId} className="hover:bg-muted/30 transition-colors">
//                 <TableCell className="font-medium">{entry.courseName}</TableCell>
//                 <TableCell className="text-center">
//                    <Badge variant={getGradeBadgeVariant(entry.grade)} className="text-xs">
//                     {entry.grade}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center justify-center space-x-2">
//                     <Progress value={entry.progress} aria-label={`${entry.progress}% complete`} className="w-[70%] h-2.5" />
//                     <span className="text-sm text-muted-foreground">{entry.progress}%</span>
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {entry.progress === 100 ? (
//                     <div className="flex items-center justify-center text-green-600">
//                       <CheckCircle className="h-4 w-4 mr-1" /> Completed
//                     </div>
//                   ) : entry.grade === "In Progress" || entry.progress > 0 ? (
//                      <div className="flex items-center justify-center text-blue-600">
//                       <Clock className="h-4 w-4 mr-1" /> In Progress
//                     </div>
//                   ) : (
//                      <div className="flex items-center justify-center text-gray-500">
//                       <TrendingUp className="h-4 w-4 mr-1" /> Not Started
//                     </div>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//          <div className="flex flex-col items-center justify-center h-64 border rounded-md">
//           <p className="text-lg text-muted-foreground">No grade information available yet.</p>
//         </div>
//       )}
//     </>
//   );
// }




"use client";

import Link from "next/link";
import { PageHeader } from "@/app/Component/page-header";
import { mockGradebook } from "@/lib/data";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

export default function GradebookPage() {
  const grades = mockGradebook;

  const getGradeBadgeClass = (grade: string) => {
    if (grade.startsWith("A")) return "bg-primary text-white"; // Bootstrap primary
    if (grade.startsWith("B")) return "bg-secondary text-white";
    if (grade.startsWith("C")) return "bg-warning text-dark"; // yellow-ish
    if (grade.startsWith("D") || grade.startsWith("F")) return "bg-danger text-white";
    return "bg-light text-dark";
  };

  return (
    <div className="container py-4">
      <PageHeader
        title="Gradebook"
        description="Track your academic performance and progress across all courses."
      />

      {grades.length > 0 ? (
        <table className="table table-hover align-middle">
          <caption className="text-muted">A summary of your course grades and progress.</caption>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Course Name</th>
              <th className="text-center">Grade</th>
              <th className="text-center" style={{ width: "30%" }}>
                Progress
              </th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((entry) => (
              <tr key={entry.courseId} className="cursor-pointer">
                <td className="fw-semibold">{entry.courseName}</td>
                <td className="text-center">
                  <span
                    className={`badge ${getGradeBadgeClass(entry.grade)} text-uppercase px-3 py-2 fs-6`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {entry.grade}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <div className="progress" style={{ width: "70%", height: "10px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${entry.progress}%` }}
                        aria-valuenow={entry.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small className="text-muted">{entry.progress}%</small>
                  </div>
                </td>
                <td className="text-center">
                  {entry.progress === 100 ? (
                    <div className="d-flex align-items-center justify-content-center text-success gap-1">
                      <CheckCircle size={16} />
                      <span>Completed</span>
                    </div>
                  ) : entry.grade === "In Progress" || entry.progress > 0 ? (
                    <div className="d-flex align-items-center justify-content-center text-info gap-1">
                      <Clock size={16} />
                      <span>In Progress</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center text-secondary gap-1">
                      <TrendingUp size={16} />
                      <span>Not Started</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center border rounded p-5" style={{ height: "16rem" }}>
          <p className="fs-5 text-muted">No grade information available yet.</p>
        </div>
      )}
    </div>
  );
}
