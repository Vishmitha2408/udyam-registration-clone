// app/formSchema.ts
export const formSchema = [
  {
    name: "aadhaar",
    label: "Aadhaar Number",
    type: "text",
    placeholder: "Enter 12-digit Aadhaar",
    maxLength: 12,
    required: true,
    pattern: /^\d{12}$/,
  },
  {
    name: "pan",
    label: "PAN Number",
    type: "text",
    placeholder: "Enter PAN Number",
    maxLength: 10,
    required: true,
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  },
  {
    name: "pin",
    label: "PIN Code",
    type: "text",
    placeholder: "Enter 6-digit PIN",
    maxLength: 6,
    required: true,
    pattern: /^\d{6}$/,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    required: true,
  },
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
  },
];
