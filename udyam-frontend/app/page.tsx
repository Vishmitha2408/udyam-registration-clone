"use client";

import { useState } from "react";
import { formSchema } from "./formSchema";

export default function Page() {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    aadhaar: "",
    pan: "",
    pin: "",
    city: "",
    state: "",
    name: "",
  });

  const handleGenerateOtp = () => {
    const aadhaar = formData.aadhaar;
    if (/^\d{12}$/.test(aadhaar)) {
      setOtpSent(true);
      alert("OTP sent successfully (simulated)");
    } else {
      alert("Enter a valid 12-digit Aadhaar number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setStep(2);
    } else {
      alert("Invalid OTP. Try 123456 for testing.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-6">Udyam Registration</h1>

      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium">
          <span className={step === 1 ? "text-blue-600" : "text-gray-400"}>
            Step 1: Aadhaar
          </span>
          <span className={step === 2 ? "text-blue-600" : "text-gray-400"}>
            Step 2: PAN + Details
          </span>
        </div>
        <div className="h-1 bg-gray-200 rounded mt-2">
          <div
            className={`h-full rounded bg-blue-600 ${
              step === 1 ? "w-1/2" : "w-full"
            }`}
          />
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              maxLength={12}
              placeholder="Enter 12-digit Aadhaar"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {!otpSent ? (
            <button
              onClick={handleGenerateOtp}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Generate OTP
            </button>
          ) : (
            <>
              <div className="mb-4 mt-4">
                <label className="block text-sm font-medium mb-1">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Try 123456"
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </>
          )}
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {formSchema
            .filter((field) => field.name !== "aadhaar") // already collected
            .map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  maxLength={field.maxLength}
                  className="w-full border px-3 py-2 rounded"
                  required={field.required}
                />
              </div>
            ))}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit Application
          </button>
        </form>
      )}
    </main>
  );
}
