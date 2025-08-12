// 'use client';

// import { useRouter } from 'next/navigation';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// interface ResetPasswordValues {
//   password: string;
//   confirmPassword: string;
// }

// interface ResetPasswordPageProps {
//   params: {
//     token: string;
//   };
// }

// const ResetPassword: React.FC<ResetPasswordPageProps> = ({ params }) => {
//   const router = useRouter();
//   const { token } = params;

//   const initialValues: ResetPasswordValues = {
//     password: '',
//     confirmPassword: '',
//   };

//   const validationSchema = Yup.object({
//     password: Yup.string()
//       .min(6, 'Password must be at least 6 characters')
//       .required('Required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords not match')
//       .required('Required'),
//   });

//   const handleSubmit = async (values: ResetPasswordValues) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/auth/reset-password/${token}`,
//         { password: values.password }
//       );

//       toast.success(res.data.message || 'Password changed successfully');

//       setTimeout(() => {
//         router.push('/auth/adminLogin');
//       }, 2000);
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
//       <Toaster position="top-center" />

//       <div className="col-md-6 bg-white p-4 rounded shadow">
//         <h2 className="text-center mb-4">Reset Password</h2>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   New Password
//                 </label>
//                 <Field
//                   id="password"
//                   name="password"
//                   type="password"
//                   className="form-control"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-danger small mt-1"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="confirmPassword" className="form-label">
//                   Confirm Password
//                 </label>
//                 <Field
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   className="form-control"
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-danger small mt-1"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`btn w-100 ${isSubmitting ? 'btn-secondary' : 'btn-primary'}`}
//               >
//                 {isSubmitting ? 'Resetting...' : 'Reset Password'}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;






"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅ import router

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ use router

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", form);
      toast.success("Password reset successful!");

      // ✅ Success पछी login पेजमा पठाउने (थोरै delay सहित)
      setTimeout(() => {
        router.push("/auth/adminLogin");
      }, 100);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Toaster position="top-right" />
      <form onSubmit={handleReset} className="p-4 card shadow w-100" style={{ maxWidth: 400 }}>
        <h4 className="mb-3 text-center">Reset Password</h4>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="form-control mb-2"
          value={form.otp}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="form-control mb-3"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
