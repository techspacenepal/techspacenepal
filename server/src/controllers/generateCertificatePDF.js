// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const generateCertificatePDF = (studentName, courseTitle, certPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({
//         size: "A4",
//         layout: "landscape",
//         margin: 0,
//       });
//       const stream = fs.createWriteStream(certPath);
//       doc.pipe(stream);

//       const bgPath = path.join(
//         __dirname,
//         "../uploads/certificate/certificate.jpg"
//       );
//       const signaturePath = path.join(__dirname, "../uploads/signature.png");

//       // Add background if it exists
//       if (fs.existsSync(bgPath)) {
//         doc.image(bgPath, 0, 0, {
//           width: doc.page.width,
//           height: doc.page.height,
//         });
//       } else {
//         doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fdf6e3"); // fallback background
//       }

    
//       // Subtitle
//       doc
//         .moveDown(18)
//         .font("Helvetica")
//         .fontSize(20)
//         .fillColor("#34495e")
//         .text("This certifies that", {
//           align: "center",
//         });

//       // Student Name
//       doc
//         .moveDown(1)
//         //.font("Times-Roman")
//         .font("Courier-Bold")
//         .fontSize(28)
//         .fillColor("#000000")
//         .text(studentName, {
//           align: "center",
//         });

//       // Course title
//       doc
//         .moveDown(0.4)
//         .font("Helvetica")
//         .fontSize(18)
//         .fillColor("#333333")
//         .text(
//           "has successfully completed the in-depth program provided by Teach Space Nepal,",
//           {
//             align: "center",
//           }
//         )
//         .moveDown(0.2)
//         .text(
//           "showcasing exceptional dedication, learning, and skill development in:",
//           {
//             align: "center",
//           }
//         )
//         .moveDown(0.2)
//         .font("Helvetica-BoldOblique")
//         .fontSize(22)
//         .fillColor("#2c3e50")
//         .text(`"${courseTitle}"`, {
//           align: "center",
//         });

//       // Issue date
//       const date = new Date().toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });

//       doc
//         .moveDown(1.5)
//         .font("Helvetica")
//         .fontSize(12)
//         .fillColor("#000000")
//         .text(`Issued on: ${date}`, 205, 470);

//       // Signature
//       if (fs.existsSync(signaturePath)) {
//         doc.image(signaturePath, doc.page.width - 325, 450, { width: 120 });
//         // doc
//         //   .font("Helvetica-Bold")
//         //   .fontSize(12)
//         //   .fillColor("#000")
//         //   .text( doc.page.width - 200, 470);
//         // "Authorized Signature",
//       }

//       doc.end();

//       stream.on("finish", () => resolve());
//       stream.on("error", (err) => reject(err));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };




import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificatePDF = (studentName, courseTitle, certPath, description) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
      const stream = fs.createWriteStream(certPath);
      doc.pipe(stream);

      const bgPath = path.join(__dirname, '../uploads/certificate/certificate.jpg');
      const signaturePath = path.join(__dirname, '../uploads/signature.png');

      if (fs.existsSync(bgPath)) {
        doc.image(bgPath, 0, 0, {
          width: doc.page.width,
          height: doc.page.height,
        });
      } else {
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fdf6e3');
      }

      doc.moveDown(18).font('Helvetica').fontSize(20).fillColor('#34495e').text('This certifies that', {
        align: 'center',
      });

      doc.moveDown(1).font('Courier-Bold').fontSize(28).fillColor('#000000').text(studentName, {
        align: 'center',
      });

      doc
        .moveDown(0.4)
        .font('Helvetica')
        .fontSize(18)
        .fillColor('#333333')
        .text(description, { align: 'center' })
        .moveDown(0.2)
        .font('Helvetica-BoldOblique')
        .fontSize(22)
        .fillColor('#2c3e50')
        .text(`"${courseTitle}"`, { align: 'center' });

      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      doc.moveDown(1.5).font('Helvetica').fontSize(12).fillColor('#000000').text(`Issued on: ${date}`, 205, 470);

      if (fs.existsSync(signaturePath)) {
        doc.image(signaturePath, doc.page.width - 325, 450, { width: 120 });
      }

      doc.end();
      stream.on('finish', () => resolve());
      stream.on('error', (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};
