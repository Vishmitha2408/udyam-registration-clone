import React from 'react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

const FormStep1 = ({ formData, setFormData, onNext }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Step 1: Aadhaar Verification</h2>
      <input
        type="text"
        name="aadhaar"
        value={formData.aadhaar || ''}
        onChange={handleChange}
        placeholder="Enter Aadhaar Number"
        className="border p-2 w-full"
        pattern="^[2-9]{1}[0-9]{11}$"
      />
      <input
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        placeholder="Enter Name"
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="otp"
        value={formData.otp || ''}
        onChange={handleChange}
        placeholder="Enter OTP"
        className="border p-2 w-full"
        pattern="^[0-9]{6}$"
      />
      <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
};

export default FormStep1;
