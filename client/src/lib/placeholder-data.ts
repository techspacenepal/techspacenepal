import type { Instructor, Course, Student } from './types';

export const instructor: Instructor = {
  name: 'Dr. Evelyn Reed',
  title: 'Senior IT Instructor',
  email: 'e.reed@skillnavigator.com',
  avatar: 'https://i.pravatar.cc/150?u=evelynreed',
};

export let courses: Course[] = [
  {
    id: 'C001',
    title: 'Advanced Networking & Security',
    description: 'Master the principles of network design, implementation, and security in enterprise environments.',
    studentCount: 45,
    status: 'Published',
    thumbnail: 'https://placehold.co/600x400',
    content: `Module 1: TCP/IP Suite. In-depth study of the TCP/IP protocol suite.
Module 2: Routing Protocols. Understanding OSPF, BGP, and EIGRP.
Module 3: Network Security. Implementing firewalls, VPNs, and intrusion detection systems.`,
  },
  {
    id: 'C002',
    title: 'Cloud Computing with AWS',
    description: 'A comprehensive guide to AWS services, including EC2, S3, Lambda, and VPC.',
    studentCount: 62,
    status: 'Published',
    thumbnail: 'https://placehold.co/600x400',
    content: `Module 1: Introduction to Cloud Computing.
Module 2: Core AWS Services. Hands-on labs with EC2, S3, and RDS.
Module 3: Serverless Architecture. Building applications with Lambda and API Gateway.`,
  },
  {
    id: 'C003',
    title: 'Python for Data Science',
    description: 'Learn Python and its powerful libraries like NumPy, Pandas, and Scikit-learn for data analysis.',
    studentCount: 58,
    status: 'Published',
    thumbnail: 'https://placehold.co/600x400',
    content: `Module 1: Python Fundamentals.
Module 2: Data Manipulation with Pandas.
Module 3: Machine Learning with Scikit-learn.`,
  },
  {
    id: 'C004',
    title: 'Introduction to Cybersecurity',
    description: 'Explore the fundamentals of cybersecurity, including threat vectors, cryptography, and ethical hacking.',
    studentCount: 75,
    status: 'Draft',
    thumbnail: 'https://placehold.co/600x400',
    content: `Module 1: The Threat Landscape.
Module 2: Cryptography Basics.
Module 3: Introduction to Penetration Testing.`,
  },
];

export const students: Student[] = [
  { id: 'S001', name: 'Alice Johnson', email: 'alice.j@example.com', avatar: 'https://i.pravatar.cc/150?u=alice', progress: 85 },
  { id: 'S002', name: 'Bob Williams', email: 'bob.w@example.com', avatar: 'https://i.pravatar.cc/150?u=bob', progress: 60 },
  { id: 'S003', name: 'Charlie Brown', email: 'charlie.b@example.com', avatar: 'https://i.pravatar.cc/150?u=charlie', progress: 92 },
  { id: 'S004', name: 'Diana Miller', email: 'diana.m@example.com', avatar: 'https://i.pravatar.cc/150?u=diana', progress: 70 },
  { id: 'S005', name: 'Ethan Davis', email: 'ethan.d@example.com', avatar: 'https://i.pravatar.cc/150?u=ethan', progress: 45 },
  { id: 'S006', name: 'Fiona Garcia', email: 'fiona.g@example.com', avatar: 'https://i.pravatar.cc/150?u=fiona', progress: 100 },
];
