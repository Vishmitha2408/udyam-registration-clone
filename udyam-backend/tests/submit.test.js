const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// The actual route copied from your backend
app.post('/submit', async (req, res) => {
  const { name, aadhaar, pan, pin, city, state } = req.body;

  if (!name || !aadhaar || !pan || !pin || !city || !state) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const aadhaarRegex = /^\d{12}$/;
  const pinRegex = /^\d{6}$/;

  if (!panRegex.test(pan)) return res.status(400).json({ error: 'Invalid PAN format.' });
  if (!aadhaarRegex.test(aadhaar)) return res.status(400).json({ error: 'Invalid Aadhaar number.' });
  if (!pinRegex.test(pin)) return res.status(400).json({ error: 'Invalid PIN code.' });

  try {
    const submission = await prisma.submission.create({
      data: { name, aadhaar, pan, pin, city, state },
    });
    res.status(200).json({ message: 'Submission saved', submission });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

describe('Form API Validation', () => {
  it('should reject invalid PAN format', async () => {
    const res = await request(app).post('/submit').send({
      name: 'Test',
      aadhaar: '123412341234',
      pan: 'ABCDE123', // invalid
      pin: '560001',
      city: 'Bangalore',
      state: 'Karnataka',
    });
    expect(res.statusCode).toBe(400);
  });

  it('should reject invalid Aadhaar', async () => {
    const res = await request(app).post('/submit').send({
      name: 'Test',
      aadhaar: '12345',
      pan: 'ABCDE1234F',
      pin: '560001',
      city: 'Bangalore',
      state: 'Karnataka',
    });
    expect(res.statusCode).toBe(400);
  });

  it('should accept valid data', async () => {
    const res = await request(app).post('/submit').send({
      name: 'Valid User',
      aadhaar: '123456789012',
      pan: 'ABCDE1234F',
      pin: '560001',
      city: 'Bangalore',
      state: 'Karnataka',
    });
    expect(res.statusCode).toBe(200);
  });
});
