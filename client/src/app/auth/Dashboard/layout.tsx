// 'use client';

// import { ReactNode, useEffect, useState } from 'react';
// import { AuthProvider } from '@/app/context/AuthContext';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useRouter, usePathname } from 'next/navigation';

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkBlockStatus = async () => {
//       try {
//         const teacherToken = Cookies.get('teacherToken');
//         const adminToken = Cookies.get('adminToken');

//         let tokenToUse = teacherToken || adminToken;
//         if (!tokenToUse) {
          
//           if (pathname !== '/auth/adminLogin') {
//             router.replace('/auth/adminLogin');
//           }
//           return;
//         }

//         const res = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${tokenToUse}`,
//           },
//         });

//         const userRole = res.data.role;

//         if (res.data.isBlocked) {
//           alert('  Your access has been temporarily suspended. For further assistance, please contact the administration.');
//           if (userRole === 'teacher') Cookies.remove('teacherToken');
//           if (userRole === 'admin') Cookies.remove('adminToken');
//           router.replace('/auth/adminLogin');
//           return;
//         }

//         // यदि role teacher हो भने मात्र यो layout खुल्न दिने
//         if (userRole !== 'teacher' && userRole !== 'admin') {
//           router.replace('/auth/adminLogin');
//           return;
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Block check error:', error);
//         Cookies.remove('teacherToken');
//         Cookies.remove('adminToken');
//         router.replace('/auth/adminLogin');
//       }
//     };

//     checkBlockStatus();
//   }, [router, pathname]);

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return <AuthProvider>{children}</AuthProvider>;
// }


'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthProvider } from '@/app/context/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
 const pathname = usePathname()!;
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const checkAuthAndRedirect = async () => {
//     const token = Cookies.get('adminToken') || Cookies.get('teacherToken') || Cookies.get('userToken');
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     // यदि token छैन भने login page मा पठाउ
//     if (!token) {
//       if (!pathname || !pathname.includes('adminLogin')) {
//         router.replace('/auth/adminLogin');
//       }
//       return;
//     }

//     try {
//       const res = await axios.get('http://localhost:5000/api/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const { isBlocked, role } = res.data;

//       if (isBlocked) {
//         alert('Your access has been temporarily suspended. Contact the administration.');
//         Cookies.remove('adminToken');
//         Cookies.remove('teacherToken');
//         Cookies.remove('userToken');
//         router.replace('/auth/adminLogin');
//         return;
//       }

//       // Role अनुसार Redirect गर्ने
//       if ((role === 'admin' || role === 'superadmin') && pathname !== '/auth/Dashboard/adminDashboard') {
//         router.replace('/auth/Dashboard/adminDashboard');
//       }  else if (role === 'teacher' && !pathname.startsWith('/auth/Dashboard/teacherDashboard')) {
//         router.replace('/auth/Dashboard/teacherDashboard');
//       } else if (role === 'user' && pathname !== '/auth/Dashboard/userDashboard') {
//         router.replace('/auth/Dashboard/userDashboard');
//       } else {
//         // यदि पहिले नै सही पृष्ठमा छ भने केही नगर्ने
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       Cookies.remove('adminToken');
//       Cookies.remove('teacherToken');
//       Cookies.remove('userToken');
//       router.replace('/auth/adminLogin');
//     }
//   };

//   if (pathname) {
//     checkAuthAndRedirect();
//   }
// }, [pathname, router]);



useEffect(() => {
  const checkAuthAndRedirect = async () => {
    const token = Cookies.get('adminToken') || Cookies.get('teacherToken') || Cookies.get('userToken');

    if (!token) {
      if (!pathname || !pathname.includes('adminLogin')) {
        router.replace('/auth/adminLogin');
      }
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { isBlocked, role } = res.data;

      if (isBlocked) {
        alert('Your access has been temporarily suspended. Contact the administration.');
        Cookies.remove('adminToken');
        Cookies.remove('teacherToken');
        Cookies.remove('userToken');
        router.replace('/auth/adminLogin');
        return;
      }

      // ✅ Refactored Role-Based Redirects
      if ((role === 'admin' || role === 'superadmin')) {
        if (!pathname.startsWith('/auth/Dashboard/adminDashboard')) {
          router.replace('/auth/Dashboard/adminDashboard');
        }
      } else if (role === 'teacher') {
        if (!pathname.startsWith('/auth/Dashboard/teacherDashboard')) {
          router.replace('/auth/Dashboard/teacherDashboard');
        }
      } else if (role === 'user') {
        if (!pathname.startsWith('/auth/Dashboard/userDashboard')) {
          router.replace('/auth/Dashboard/userDashboard');
        }
      } else {
        router.replace('/auth/adminLogin');
      }

      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      Cookies.remove('adminToken');
      Cookies.remove('teacherToken');
      Cookies.remove('userToken');
      router.replace('/auth/adminLogin');
    }
  };

  if (pathname) {
    checkAuthAndRedirect();
  }
}, [pathname, router]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthProvider>{children}</AuthProvider>;
}

