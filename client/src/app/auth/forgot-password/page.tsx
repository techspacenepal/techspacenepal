'use client';
import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initialValues: ForgotPasswordValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const handleSubmit = async (
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email: values.email }
      );

      setSuccessMessage(res.data.message);
      setErrorMessage('');

      const token = res.data.resetToken;

      if (token) {
        setTimeout(() => {
          router.push(`/auth/reset-password/${token}`);
        }, 1000);
      } else {
        setErrorMessage('No reset token received from server');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Something went wrong');
      setSuccessMessage('');
    }
    setSubmitting(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Forgot Password</h2>

        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn w-100 ${isSubmitting ? 'btn-secondary' : 'btn-danger'}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
