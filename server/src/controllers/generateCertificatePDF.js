// ---------- working code ------------

// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const generateCertificatePDF = (studentName, courseTitle, certPath, description) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
//       const stream = fs.createWriteStream(certPath);
//       doc.pipe(stream);

      
//       const bgPath = path.join(__dirname, '../uploads/certificate/certificate.jpg');
//       const signaturePath = path.join(__dirname, '../uploads/signature.png');

//       if (fs.existsSync(bgPath)) {
//         doc.image(bgPath, 0, 0, {
//           width: doc.page.width,
//           height: doc.page.height,
//         });
//       } else {
//         doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fdf6e3');
//       }

//       doc.moveDown(18).font('Helvetica').fontSize(20).fillColor('#34495e').text('This certifies that', {
//         align: 'center',
//       });

//       doc.moveDown(1).font('Courier-Bold').fontSize(28).fillColor('#000000').text(studentName, {
//         align: 'center',
//       });

//       doc
//         .moveDown(0.4)
//         .font('Helvetica')
//         .fontSize(18)
//         .fillColor('#333333')
//         .text(description, { align: 'center' })
        
//         .moveDown(0.2)
//         .font('Helvetica-BoldOblique')
//         .fontSize(22)
//         .fillColor('#2c3e50')
//         .text(`"${courseTitle}"`, { align: 'center' });

//       const date = new Date().toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       });

//       doc.moveDown(1.5).font('Helvetica').fontSize(12).fillColor('#000000').text(`Issued on: ${date}`, 205, 470);

//       if (fs.existsSync(signaturePath)) {
//         doc.image(signaturePath, doc.page.width - 325, 450, { width: 120 });
//       }

//       doc.end();
//       stream.on('finish', () => resolve());
//       stream.on('error', (err) => reject(err));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };



////------ testing  code in url download only certificates background --------------
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificatePDF = (studentName, courseTitle, certPath, description, isTemplate = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
      const stream = fs.createWriteStream(certPath);
      doc.pipe(stream);

      const bgPath = path.join(__dirname, '../uploads/certificate/certificate.jpg');
       const signaturePath = path.join(__dirname, '../uploads/signature.png');
        const certificateNumber = `CERT-${Date.now()}`;

      if (fs.existsSync(bgPath)) {
        doc.image(bgPath, 0, 0, {
          width: doc.page.width,
          height: doc.page.height,
        });
      } else {
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
      }

      if (!isTemplate) {
        // 🖊️ Add content only when isTemplate is false
        doc
          .moveDown(18)
          .font('Helvetica')
          .fontSize(20)
          .fillColor('#34495e')
          .text('This certifies that', { align: 'center' });

        doc
          .moveDown(1)
          .font('Courier-Bold')
          .fontSize(28)
          .fillColor('#000000')
          .text(studentName, { align: 'center' });

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

        doc
          .moveDown(1.5)
          .font('Helvetica')
          .fontSize(12)
          .fillColor('#000000')
          .text(`Issued on: ${date}`, 205, 470);


          if (fs.existsSync(signaturePath)) {
        doc.image(signaturePath, doc.page.width - 325, 450, { width: 120 });
      }

     
      }


      
        doc
          .font('Helvetica-Oblique')
          .fontSize(10)
          .fillColor('#888888')
          .text(` ${certificateNumber}`, 370, 550);

      doc.end();
      stream.on('finish', () => resolve());
      stream.on('error', (err) => reject(err));

      
    } catch (error) {
      reject(error);
    }
  });
};

