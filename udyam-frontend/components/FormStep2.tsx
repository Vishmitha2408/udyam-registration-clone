import React from 'react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
}

const FormStep2 = ({ formData, setFormData, onSubmit }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Step 2: PAN Details</h2>
      <input
        type="text"
        name="pan"
        value={formData.pan || ''}
        onChange={handleChange}
        placeholder="Enter PAN Number"
        className="border p-2 w-full"
        pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
      />
      <input
        type="text"
        name="enterpriseName"
        value={formData.enterpriseName || ''}
        onChange={handleChange}
        placeholder="Enter Enterprise Name"
        className="border p-2 w-full"
      />
      <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
};

export default FormStep2;
