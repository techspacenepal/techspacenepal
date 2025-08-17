// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import AdminPaymentLogos from '@/pages/AdminPaymentLogos';

// const BASE_URL = 'http://localhost:5000/api';

// export default function AdminContactInfoForm() {
//   const [form, setForm] = useState({
//     address: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     socialLinks: {
//       facebook: '',
//       linkedin: '',
//       twitter: '',
//       instagram: '',
//       youtube: '',
//       tiktok: '',
//       whatsapp: ''
//     }
//   });

//   useEffect(() => {
//     axios.get(`${BASE_URL}/contact-info`)
//       .then(res => {
//         if (res.data) {
//           setForm({
//             address: res.data.address || '',
//             email: res.data.email || '',
//             phone: res.data.phone || '',
//             whatsapp: res.data.whatsapp || '',
//             socialLinks: {
//               facebook: res.data.socialLinks?.facebook || '',
//               linkedin: res.data.socialLinks?.linkedin || '',
//               twitter: res.data.socialLinks?.twitter || '',
//               instagram: res.data.socialLinks?.instagram || '',
//               youtube: res.data.socialLinks?.youtube || '',
//               tiktok: res.data.socialLinks?.tiktok || '',
//               whatsapp: res.data.socialLinks?.whatsapp || ''
//             }
//           });
//         }
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name in form.socialLinks) {
//       setForm(prev => ({
//         ...prev,
//         socialLinks: { ...prev.socialLinks, [name]: value }
//       }));
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${BASE_URL}/contact-info`, form);
//       toast.success('Updated successfully!');

//       const res = await axios.get(`${BASE_URL}/contact-info`);
//       if (res.data) {
//         setForm({
//           address: res.data.address || '',
//           email: res.data.email || '',
//           phone: res.data.phone || '',
//           whatsapp: res.data.whatsapp || '',
//           socialLinks: {
//             facebook: res.data.socialLinks?.facebook || '',
//             linkedin: res.data.socialLinks?.linkedin || '',
//             twitter: res.data.socialLinks?.twitter || '',
//             instagram: res.data.socialLinks?.instagram || '',
//             youtube: res.data.socialLinks?.youtube || '',
//             tiktok: res.data.socialLinks?.tiktok || '',
//             whatsapp: res.data.socialLinks?.whatsapp || ''
//           }
//         });
//       }
//     } catch (err) {
//       toast.error('Failed to update');
//     }
//   };

//   const socialIcons = {
//     facebook: 'facebook-f',
//     linkedin: 'linkedin-in',
//     twitter: 'twitter',
//     instagram: 'instagram',
//     youtube: 'youtube',
//     tiktok: 'tiktok',
//     whatsapp: 'whatsapp'
//   };

//   return (
//     <>
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8 col-md-10 col-sm-12">
//           <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
//             <h4 className="mb-4">Update Contact Info</h4>

//             <div className="mb-3">
//               <label htmlFor="address" className="form-label">
//                 Address <span className="text-danger">*</span>
//               </label>
//               <input
//                 id="address"
//                 name="address"
//                 value={form.address}
//                 onChange={handleChange}
//                 placeholder="Address"
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email <span className="text-danger">*</span>
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label">
//                 Phone <span className="text-danger">*</span>
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="whatsapp" className="form-label">
//                 WhatsApp Number <span className="text-danger">*</span>
//               </label>
//               <input
//                 id="whatsapp"
//                 name="whatsapp"
//                 value={form.whatsapp}
//                 onChange={handleChange}
//                 placeholder="WhatsApp Number"
//                 className="form-control"
//                 required
//               />
//             </div>

//             <h5 className="mb-3">Social Links</h5>

//             {Object.keys(form.socialLinks).map(key => (
//               <div className="mb-3" key={key}>
//                 <label htmlFor={key} className="form-label text-capitalize">
//                   {key} {key === 'facebook' || key === 'instagram' || key === 'twitter' || key === 'linkedin' || key === 'youtube' || key === 'tiktok' ? <span className="text-danger">*</span> : null}
//                 </label>
//                 <input
//                   id={key}
//                   name={key}
//                   value={(form.socialLinks as any)[key]}
//                   onChange={handleChange}
//                   placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                   className="form-control"
//                   required={key !== 'whatsapp'} // WhatsApp link optional here
//                 />
//               </div>
//             ))}

//             <button type="submit" className="btn btn-success mt-3 w-100">
//               Save
//             </button>
//           </form>

//           {/* Preview Section */}
//           <div className="mt-5 p-3 border rounded bg-light">
//             <h5 className="fw-bold">Live Preview</h5>
//             <p><i className="fas fa-map-marker-alt me-2"></i>{form.address}</p>
//             <p><i className="fas fa-envelope me-2"></i>{form.email}</p>
//             <p><i className="fas fa-phone me-2"></i>{form.phone}</p>
//             <p><i className="fab fa-whatsapp me-2"></i>{form.whatsapp}</p>

//             <h6 className="fw-bold mt-3">Social Links</h6>
//             <div className="d-flex gap-2 flex-wrap">
//               {Object.entries(form.socialLinks || {}).map(([platform, url]) =>
//                 url ? (
//                   <a
//                     key={platform}
//                     href={url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-decoration-none text-dark"
//                   >
//                     <div className="border rounded-circle d-flex align-items-center justify-content-center"
//                       style={{ width: '40px', height: '40px' }}>
//                       <i className={`fab fa-${socialIcons[platform as keyof typeof socialIcons]} fa-lg`}></i>
//                     </div>
//                   </a>
//                 ) : null
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <section>
//       <AdminPaymentLogos/>
//     </section>

//     </>
//   );
// }



'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminPaymentLogos from '@/pages/AdminPaymentLogos';

const BASE_URL = 'http://localhost:5000/api';

export default function AdminContactInfoForm() {
  const [form, setForm] = useState({
    address: '',
    email: [''],
    phone: [''],
    whatsapp: '',
    socialLinks: {
      facebook: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      youtube: '',
      tiktok: '',
      whatsapp: ''
    }
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/contact-info`)
      .then(res => {
        if (res.data) {
          setForm({
            address: res.data.address || '',
            email: Array.isArray(res.data.email) ? res.data.email : [res.data.email || ''],
            phone: Array.isArray(res.data.phone) ? res.data.phone : [res.data.phone || ''],
            whatsapp: res.data.whatsapp || '',
            socialLinks: {
              facebook: res.data.socialLinks?.facebook || '',
              linkedin: res.data.socialLinks?.linkedin || '',
              twitter: res.data.socialLinks?.twitter || '',
              instagram: res.data.socialLinks?.instagram || '',
              youtube: res.data.socialLinks?.youtube || '',
              tiktok: res.data.socialLinks?.tiktok || '',
              whatsapp: res.data.socialLinks?.whatsapp || ''
            }
          });
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string) => {
    const { name, value } = e.target;
    if (field === 'email' && index !== undefined) {
      const updated = [...form.email];
      updated[index] = value;
      setForm(prev => ({ ...prev, email: updated }));
    } else if (field === 'phone' && index !== undefined) {
      const updated = [...form.phone];
      updated[index] = value;
      setForm(prev => ({ ...prev, phone: updated }));
    } else if (name in form.socialLinks) {
      setForm(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const addField = (field: 'email' | 'phone') => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeField = (field: 'email' | 'phone', index: number) => {
    setForm(prev => {
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated.length ? updated : [''] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/contact-info`, form);
      toast.success('Updated successfully!');

      const res = await axios.get(`${BASE_URL}/contact-info`);
      if (res.data) {
        setForm({
          address: res.data.address || '',
          email: Array.isArray(res.data.email) ? res.data.email : [res.data.email || ''],
          phone: Array.isArray(res.data.phone) ? res.data.phone : [res.data.phone || ''],
          whatsapp: res.data.whatsapp || '',
          socialLinks: {
            facebook: res.data.socialLinks?.facebook || '',
            linkedin: res.data.socialLinks?.linkedin || '',
            twitter: res.data.socialLinks?.twitter || '',
            instagram: res.data.socialLinks?.instagram || '',
            youtube: res.data.socialLinks?.youtube || '',
            tiktok: res.data.socialLinks?.tiktok || '',
            whatsapp: res.data.socialLinks?.whatsapp || ''
          }
        });
      }
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const socialIcons = {
    facebook: 'facebook-f',
    linkedin: 'linkedin-in',
    twitter: 'twitter',
    instagram: 'instagram',
    youtube: 'youtube',
    tiktok: 'tiktok',
    whatsapp: 'whatsapp'
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
              <h4 className="mb-4">Update Contact Info</h4>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="form-control"
                  required
                />
              </div>

              {/* Email Multiple */}
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                {form.email.map((em, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <input
                      type="email"
                      name="email"
                      value={em}
                      onChange={(e) => handleChange(e, i, 'email')}
                      placeholder="Email"
                      className="form-control"
                      required
                    />
                    <button type="button" className="btn btn-danger" onClick={() => removeField('email', i)}>−</button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addField('email')}>+ Add Email</button>
              </div>

              {/* Phone Multiple */}
              <div className="mb-3">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                {form.phone.map((ph, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <input
                      name="phone"
                      value={ph}
                      onChange={(e) => handleChange(e, i, 'phone')}
                      placeholder="Phone"
                      className="form-control"
                      required
                    />
                    <button type="button" className="btn btn-danger" onClick={() => removeField('phone', i)}>−</button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addField('phone')}>+ Add Phone</button>
              </div>

              <div className="mb-4">
                <label htmlFor="whatsapp" className="form-label">
                  WhatsApp Number <span className="text-danger">*</span>
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp Number"
                  className="form-control"
                  required
                />
              </div>

              <h5 className="mb-3">Social Links</h5>

              {Object.keys(form.socialLinks).map(key => (
                <div className="mb-3" key={key}>
                  <label htmlFor={key} className="form-label text-capitalize">
                    {key}
                  </label>
                  <input
                    id={key}
                    name={key}
                    value={(form.socialLinks as any)[key]}
                    onChange={handleChange}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="form-control"
                    // 👇 अब required हटाइयो
                    required={false}
                  />
                </div>
              ))}


              <button type="submit" className="btn btn-success mt-3 w-100">
                Save
              </button>
            </form>

            {/* Preview Section */}
            <div className="mt-5 p-3 border rounded bg-light">
              <h5 className="fw-bold">Live Preview</h5>
              <p><i className="fas fa-map-marker-alt me-2"></i>{form.address}</p>
              {form.email.map((em, i) => <p key={i}><i className="fas fa-envelope me-2"></i>{em}</p>)}
              {form.phone.map((ph, i) => <p key={i}><i className="fas fa-phone me-2"></i>{ph}</p>)}
              <p><i className="fab fa-whatsapp me-2"></i>{form.whatsapp}</p>

              <h6 className="fw-bold mt-3">Social Links</h6>
              <div className="d-flex gap-2 flex-wrap">
                {Object.entries(form.socialLinks || {}).map(([platform, url]) =>
                  url ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none text-dark"
                    >
                      <div className="border rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px' }}>
                        <i className={`fab fa-${socialIcons[platform as keyof typeof socialIcons]} fa-lg`}></i>
                      </div>
                    </a>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <AdminPaymentLogos />
      </section>
    </>
  );
}
