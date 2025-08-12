import FooterPaymentLogo from '../models/FooterPaymentLogo.js';
import FooterCopyright from '../models/FooterCopyright.js';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');

// --- Payment Logos ---

export const getPaymentLogos = async (req, res) => {
  try {
    const logos = await FooterPaymentLogo.find({});
    res.json(logos);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching payment logos' });
  }
};

export const createPaymentLogo = async (req, res) => {
  try {
    const { name } = req.body;
    const imgFile = req.files?.img?.[0];
    const modalImageFile = req.files?.modalImage?.[0];

    if (!imgFile) return res.status(400).json({ message: 'Main logo image is required' });

    const newLogo = new FooterPaymentLogo({
      name,
      img: imgFile.filename,
      modalImage: modalImageFile ? modalImageFile.filename : '',
    });

    await newLogo.save();
    res.status(201).json(newLogo);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating payment logo' });
  }
};

export const updatePaymentLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await FooterPaymentLogo.findById(id);
    if (!logo) return res.status(404).json({ message: 'Logo not found' });

    const { name } = req.body;
    const imgFile = req.files?.img?.[0];
    const modalImageFile = req.files?.modalImage?.[0];

    if (name) logo.name = name;

    if (imgFile) {
      const oldImgPath = path.join(uploadDir, logo.img);
      if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
      logo.img = imgFile.filename;
    }

    if (modalImageFile) {
      if (logo.modalImage) {
        const oldModalPath = path.join(uploadDir, logo.modalImage);
        if (fs.existsSync(oldModalPath)) fs.unlinkSync(oldModalPath);
      }
      logo.modalImage = modalImageFile.filename;
    }

    await logo.save();
    res.json(logo);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating payment logo' });
  }
};

export const deletePaymentLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await FooterPaymentLogo.findById(id);
    if (!logo) return res.status(404).json({ message: 'Logo not found' });

    const logoPath = path.join(uploadDir, logo.img);
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);

    if (logo.modalImage) {
      const modalPath = path.join(uploadDir, logo.modalImage);
      if (fs.existsSync(modalPath)) fs.unlinkSync(modalPath);
    }

    await logo.deleteOne();
    res.json({ message: 'Logo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting payment logo' });
  }
};

// --- Footer Copyright ---

export const getFooterCopyright = async (req, res) => {
  try {
    const data = await FooterCopyright.findOne({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching footer copyright' });
  }
};

export const updateFooterCopyright = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });

    let data = await FooterCopyright.findOne({});
    if (!data) {
      data = new FooterCopyright({ text });
    } else {
      data.text = text;
    }

    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating footer copyright' });
  }
};
