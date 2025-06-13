// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function TeamPage() {
//   const [teamMembers, setTeamMembers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/team").then((res) => {
//       setTeamMembers(res.data);
//     });
//   }, []);

//   return (
//     <section className="bg-white py-5">
//       <div className="container">
//         <h2 className="text-center fw-bold mb-4 text-primary">Meet Our Team</h2>
//         <p className="text-center text-muted mb-5">
//           Experienced mentors dedicated to shaping Nepal's IT future.
//         </p>
//         <div className="row g-4">
//           {teamMembers.map((member, idx) => (
//             <div className="col-12 col-md-6 col-lg-4" key={idx}>
//               <div className="card border-0 shadow-lg h-100 text-center">
//                 <div className="card-body">
//                   <img
//                     src={`http://localhost:5000${member.image}`}
//                     alt={member.name}
//                     className="rounded-circle mb-3"
//                     width="100"
//                     height="100"
//                   />
//                   <h5 className="fw-bold">{member.name}</h5>
//                   <p className="text-muted mb-1">{member.role}</p>
//                   <small className="text-secondary">{member.bio}</small>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TeamListPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/team");
      setTeam(data);
    } catch (error) {
      console.error("Failed to load team members");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Our Team</h2>
      <div className="row g-4">
        {team.map((member) => (
          <div className="col-md-4" key={member._id}>
            <div className="card p-3 text-center shadow-sm">
              <img
                src={`http://localhost:5000/uploads/${member.image}`}
                alt={member.name}
                className="rounded-circle mx-auto"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <h5 className="mt-3">{member.name}</h5>
              <p className="text-muted">{member.role}</p>
              <p className="small">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
