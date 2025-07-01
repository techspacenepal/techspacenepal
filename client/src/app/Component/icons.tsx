import type { LucideProps } from 'lucide-react';
import { BookOpen, Home, Users, BarChart, BrainCircuit, PlusCircle } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  home: Home,
  courses: BookOpen,
  students: Users,
  grades: BarChart,
  ai: BrainCircuit,
  add: PlusCircle,
};
