// /auth/adminRegister/page.tsx
import Head from 'next/head';
import AdminRegisterPage from './page';

export default function Page() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Registration</title>
      </Head>
      <AdminRegisterPage />
    </>
  );
}
