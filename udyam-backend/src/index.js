const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// POST /submit route
app.post('/submit', async (req, res) => {
  const { name, aadhaar, pan, pin, city, state } = req.body;

  // ✅ Aadhaar must be exactly 12 digits
  const aadhaarRegex = /^\d{12}$/;
  if (!aadhaarRegex.test(aadhaar)) {
    return res.status(400).json({ error: 'Invalid Aadhaar number. Must be 12 digits.' });
  }

  // ✅ PAN must follow format: 5 letters, 4 digits, 1 letter
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
  if (!panRegex.test(pan)) {
    return res.status(400).json({ error: 'Invalid PAN number. Format: ABCDE1234F' });
  }

  try {
    const submission = await prisma.submission.create({
      data: {
        name,
        aadhaar,
        pan,
        pin,
        city,
        state,
      },
    });
    res.status(200).json(submission);
  } catch (err) {
    console.error('❌ Error saving to DB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
