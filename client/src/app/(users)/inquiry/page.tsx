// "use client";
// import { CgMail } from "react-icons/cg";


// import React, { useState } from "react";
// import Link from "next/link";

// export default function SendInquiry() {
//   const [showAlternate, setShowAlternate] = useState(false);

//   const toggleAlternate = () => {
//     setShowAlternate((prev) => !prev);
//   };

//   return (
//     <div className="container py-5">
//       <div className="row">
//         {/* ...Left Section here (same as before)... */}
//          <div className="col-md-6 mb-4 px-4">
//   <h4 className="mb-3 fw-bold">Get In Touch</h4>
//   <p className="text-muted">Contact us directly for quick interaction.</p>

//   <div className="row py-3">
//     <div className="col-sm-6 mb-3">
//       <h6>📱 Viber/Whatsapp</h6>
//       <p className="mb-0">+977-9841002000</p>
//     </div>
//     <div className="col-sm-6 mb-3">
//       <h6>📞 Contact</h6>
//       <p className="mb-0">
//         +977-981-0938993<br />
//         +977-981-0938993<br />
//         +977-9827598918<br />
//         +977-
//       </p>
//     </div>
//   </div>
// <div className="row py-3">
//   <div className="col-sm-6 mb-3">
//     <h6>☎️ Hotline</h6>
//     <p className="mb-0">+977-9810938993</p>
//   </div>

//   <div className="col-sm-6 mb-3 ">
//     <h6><CgMail /> Email</h6>
//     <p className="mb-0">
//       tachspace@gmail.com<br />
//       hr@techspacenepal.com<br />
//       support@techspacenepal.com<br />
//       inquiry@techspacenepal.com
//     </p>
//   </div>
//   </div>

//   <h5 className="mt-4 fw-bold">Upcoming Classes</h5>
//   <div className="d-flex gap-3 overflow-auto">
//     <div className="card shadow-sm" style={{ width: "150px" }}>
//       <div className="card-body">
//         <h6>📘 Digital Marketing 360°</h6>
//         <p className="small mb-0">🕒 05:30 PM - 07:00 PM</p>
//       </div>
//     </div>
//     <div className="card shadow-sm" style={{ width: "150px" }}>
//       <div className="card-body">
//         <h6>💾 SQL Server Training</h6>
//         <p className="small mb-0">🕒 10:00 AM - 11:30 AM</p>
//       </div>
//     </div>
//     <div className="card shadow-sm" style={{ width: "150px" }}>
//       <div className="card-body">
//         <h6>📱 Social Media Marketing</h6>
//         <p className="small mb-0">🕒 05:30 PM - 07:00 PM</p>
//       </div>
//     </div>
//   </div>
// </div>


//         {/* Right Section */}
//         <div className="col-md-6 px-4 ">
//           <h4 className="mb-3">Course Inquiry</h4>
//           <p>Please submit your details via the form below. Our support team will get back to you as soon as possible.</p>

//           <form>
//             {/* Course */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Course <span className="text-danger">*</span>
//               </label>
//               <select className="form-select" required>
//                 <option value="">Choose a Course...</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Digital Marketing">Digital Marketing</option>
//               </select>
//             </div>

//             {/* Full Name */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Full Name <span className="text-danger">*</span>
//               </label>
//               <input type="text" className="form-control" placeholder="Your Name" required />
//             </div>

//             {/* Email */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Email address <span className="text-danger">*</span>
//               </label>
//               <input type="email" className="form-control" placeholder="Your Email" required />
//             </div>

//             {/* Mobile Number */}
//             <div className="mb-3 ">
//               <label className="form-label">
//                 Mobile Number <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text">+977</span>
//                 <input type="tel" className="form-control" placeholder="9841002000" required />
//               </div>
//             </div>

//             {/* Message */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Message <span className="text-danger">*</span>
//               </label>
//               <textarea className="form-control" rows={3} placeholder="Tell us about you" required></textarea>
//             </div>


//             {/* reCAPTCHA */}
//             <div className="mb-3">
//               <div className="g-recaptcha" data-sitekey="your-site-key">
              
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
//             >
//               Send Inquiry <i className="bi bi-arrow-right"></i>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import { CgMail } from "react-icons/cg";
import React from "react";

export default function SendInquiry() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const course = (form.elements.namedItem("course") as HTMLSelectElement).value;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const mobile = (form.elements.namedItem("mobile") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      const res = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course,
          fullName,
          email,
          mobile,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Inquiry sent successfully!");
        form.reset();
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 mb-4 px-4">
          <h4 className="mb-3 fw-bold">Get In Touch</h4>
          <p className="text-muted">Contact us directly for quick interaction.</p>

          <div className="row py-3">
            <div className="col-sm-6 mb-3">
              <h6>📱 Viber/Whatsapp</h6>
              <p className="mb-0">+977-9841002000</p>
            </div>
            <div className="col-sm-6 mb-3">
              <h6>📞 Contact</h6>
              <p className="mb-0">
                +977-981-0938993<br />
                +977-981-0938993<br />
                +977-9827598918<br />
              </p>
            </div>
          </div>

          <div className="row py-3">
            <div className="col-sm-6 mb-3">
              <h6>☎️ Hotline</h6>
              <p className="mb-0">+977-9810938993</p>
            </div>

            <div className="col-sm-6 mb-3">
              <h6>
                <CgMail /> Email
              </h6>
              <p className="mb-0">
                tachspace@gmail.com<br />
                hr@techspacenepal.com<br />
                support@techspacenepal.com<br />
                inquiry@techspacenepal.com
              </p>
            </div>
          </div>

          <h5 className="mt-4 fw-bold">Upcoming Classes</h5>
          <div className="d-flex gap-3 overflow-auto">
            <div className="card shadow-sm" style={{ width: "150px" }}>
              <div className="card-body">
                <h6>📘 Digital Marketing 360°</h6>
                <p className="small mb-0">🕒 05:30 PM - 07:00 PM</p>
              </div>
            </div>
            <div className="card shadow-sm" style={{ width: "150px" }}>
              <div className="card-body">
                <h6>💾 SQL Server Training</h6>
                <p className="small mb-0">🕒 10:00 AM - 11:30 AM</p>
              </div>
            </div>
            <div className="card shadow-sm" style={{ width: "150px" }}>
              <div className="card-body">
                <h6>📱 Social Media Marketing</h6>
                <p className="small mb-0">🕒 05:30 PM - 07:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 px-4">
          <h4 className="mb-3">Course Inquiry</h4>
          <p>Please submit your details via the form below. Our support team will get back to you as soon as possible.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Course <span className="text-danger">*</span></label>
              <select name="course" className="form-select" required>
                <option value="">Choose a Course...</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Full Name <span className="text-danger">*</span></label>
              <input name="fullName" type="text" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input name="email" type="email" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text">+977</span>
                <input name="mobile" type="tel" className="form-control" required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Message <span className="text-danger">*</span></label>
              <textarea name="message" className="form-control" rows={3} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
}
