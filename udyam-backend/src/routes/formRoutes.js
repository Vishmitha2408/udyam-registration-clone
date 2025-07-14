// src/routes/formRoutes.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { name, aadhaar, pan } = req.body;

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadhaarRegex = /^[0-9]{12}$/;

  if (!panRegex.test(pan)) return res.status(400).json({ error: 'Invalid PAN' });
  if (!aadhaarRegex.test(aadhaar)) return res.status(400).json({ error: 'Invalid Aadhaar' });

  try {
    const submission = await prisma.submission.create({
      data: { name, aadhaar, pan },
    });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
