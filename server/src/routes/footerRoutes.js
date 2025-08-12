import express from 'express';
import multer from 'multer';
import {
  getPaymentLogos,
  createPaymentLogo,
  updatePaymentLogo,
  deletePaymentLogo,
  getFooterCopyright,
  updateFooterCopyright,
} from '../controllers/footerController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/payment-logos', getPaymentLogos);

router.post(
  '/payment-logos',
  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'modalImage', maxCount: 1 },
  ]),
  createPaymentLogo
);

router.put(
  '/payment-logos/:id',
  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'modalImage', maxCount: 1 },
  ]),
  updatePaymentLogo
);

router.delete('/payment-logos/:id', deletePaymentLogo);

router.get('/copyright', getFooterCopyright);
router.put('/copyright', updateFooterCopyright);

export default router;
