// src/validate.js

function validateSubmission(data) {
  const { name, aadhaar, pan, pin, city, state } = data;

  if (!name || !aadhaar || !pan || !pin || !city || !state) {
    return 'All fields are required';
  }

  if (!/^\d{12}$/.test(aadhaar)) {
    return 'Invalid Aadhaar';
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    return 'Invalid PAN';
  }

  if (!/^\d{6}$/.test(pin)) {
    return 'Invalid PIN';
  }

  return null;
}

module.exports = { validateSubmission };
