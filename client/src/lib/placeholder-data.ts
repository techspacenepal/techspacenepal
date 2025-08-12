import type { Instructor, Course, Student } from "./types";

export const instructor: Instructor = {
  name: "Dr. Evelyn Reed",
  title: "Senior IT Instructor",
  email: "e.reed@skillnavigator.com",
  avatar: "https://i.pravatar.cc/150?u=evelynreed",
};

export let courses: Course[] = [
  {
    id: "C001",
    title: "Advanced Networking & Security",
    name: "Networking & Security",
    instructor: "Dr. Evelyn Reed",
    description:
      "Master the principles of network design, implementation, and security in enterprise environments.",
    studentCount: 45,
    status: "Published",
    thumbnail: "https://placehold.co/600x400",
    progress: 0,
    modules: [],
    content: `Module 1: TCP/IP Suite. In-depth study of the TCP/IP protocol suite.
Module 2: Routing Protocols. Understanding OSPF, BGP, and EIGRP.
Module 3: Network Security. Implementing firewalls, VPNs, and intrusion detection systems.`,
  },
  {
    id: "C002",
    title: "Cloud Computing with AWS",
    name: "AWS Essentials",
    instructor: "Dr. Evelyn Reed",
    description:
      "A comprehensive guide to AWS services, including EC2, S3, Lambda, and VPC.",
    studentCount: 62,
    status: "Published",
    thumbnail: "https://placehold.co/600x400",
    progress: 0,
    modules: [
     
    ],
    content: `Module 1: Introduction to Cloud Computing.
Module 2: Core AWS Services. Hands-on labs with EC2, S3, and RDS.
Module 3: Serverless Architecture. Building applications with Lambda and API Gateway.`,
  },
  {
    id: "C003",
    title: "Python for Data Science",
    name: "Data Science with Python",
    instructor: "Dr. Evelyn Reed",
    description:
      "Learn Python and its powerful libraries like NumPy, Pandas, and Scikit-learn for data analysis.",
    studentCount: 58,
    status: "Published",
    thumbnail: "https://placehold.co/600x400",
    progress: 0,
    modules: [],
    content: `Module 1: Python Fundamentals.
Module 2: Data Manipulation with Pandas.
Module 3: Machine Learning with Scikit-learn.`,
  },
  {
    id: "C004",
    title: "Introduction to Cybersecurity",
    name: "Cybersecurity Basics",
    instructor: "Dr. Evelyn Reed",
    description:
      "Explore the fundamentals of cybersecurity, including threat vectors, cryptography, and ethical hacking.",
    studentCount: 75,
    status: "Draft",
    thumbnail: "https://placehold.co/600x400",
    progress: 0,
    modules: [],
    content: `Module 1: The Threat Landscape.
Module 2: Cryptography Basics.
Module 3: Introduction to Penetration Testing.`,
  },
];

export const students: Student[] = [
  {
    id: "S001",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "9800000001",
    avatarUrl: "https://i.pravatar.cc/150?u=alice",
    enrolledCoursesIds: ["C001", "C002"],
  },
  {
    id: "S002",
    name: "Bob Williams",
    email: "bob.w@example.com",
    phone: "9800000002",
    avatarUrl: "https://i.pravatar.cc/150?u=bob",
    enrolledCoursesIds: ["C002"],
  },
  {
    id: "S003",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    phone: "9800000003",
    avatarUrl: "https://i.pravatar.cc/150?u=charlie",
    enrolledCoursesIds: [],
  },
];
