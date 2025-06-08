'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

const ResetPassword: React.FC<ResetPasswordPageProps> = ({ params }) => {
  const router = useRouter();
  const { token } = params;

  const initialValues: ResetPasswordValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords not match')
      .required('Required'),
  });

  const handleSubmit = async (values: ResetPasswordValues) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password: values.password }
      );

      toast.success(res.data.message || 'Password changed successfully');

      setTimeout(() => {
        router.push('/auth/adminLogin');
      }, 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <Toaster position="top-center" />

      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Reset Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn w-100 ${isSubmitting ? 'btn-secondary' : 'btn-primary'}`}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
