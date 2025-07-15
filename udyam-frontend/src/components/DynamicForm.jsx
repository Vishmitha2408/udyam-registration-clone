import React, { useState } from "react";

function DynamicForm() {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");

  const validatePAN = (value) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(value)) {
      setPanError("Invalid PAN format. Eg: ABCDE1234F");
    } else {
      setPanError("");
    }
    setPan(value);
  };

  const fetchCityState = async (pinCode) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
      const data = await res.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setCity(postOffice.District);
        setState(postOffice.State);
      } else {
        setCity("");
        setState("");
      }
    } catch (err) {
      console.error("PIN fetch error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md mt-10">
      {/* Step Progress */}
      <div className="flex justify-center mb-6 gap-4 text-sm font-medium">
        <span className={step >= 1 ? "text-blue-600" : "text-gray-400"}>✓ Step 1: Aadhaar</span>
        <span className="text-gray-400">➜</span>
        <span className={step >= 2 ? "text-blue-600" : "text-gray-600"}>Step 2: PAN + Details</span>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
      </h2>

      {/* Step 1 */}
      <h3 className="text-lg font-semibold mb-3">Step 1: Aadhaar Verification</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="aadhaar" className="block mb-1 font-medium">1. Aadhaar Number / आधार संख्या</label>
          <input type="text" id="aadhaar" className="w-full border rounded px-3 py-2" placeholder="Enter Aadhaar Number" />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">2. Name of Entrepreneur / उद्यमी का नाम</label>
          <input type="text" id="name" className="w-full border rounded px-3 py-2" placeholder="Name as per Aadhaar" />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm">
          <input type="checkbox" required className="mr-2" />
          I, the holder of the above Aadhaar, give my consent to Ministry of MSME...
        </label>
      </div>

      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded" onClick={() => setStep(2)}>Next</button>

      {/* Step 2 */}
      {step === 2 && (
        <>
          <h3 className="text-lg font-semibold mt-8 mb-3">Step 2: PAN + Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pan" className="block mb-1 font-medium">PAN Number</label>
              <input
                type="text"
                id="pan"
                className="w-full border rounded px-3 py-2"
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => validatePAN(e.target.value)}
              />
              {panError && <p className="text-red-500 text-sm mt-1">{panError}</p>}
            </div>
            <div>
              <label htmlFor="panName" className="block mb-1 font-medium">Name as per PAN</label>
              <input type="text" id="panName" className="w-full border rounded px-3 py-2" placeholder="Full Name" />
            </div>
          </div>

          {/* PIN Autofill */}
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="pin" className="block mb-1 font-medium">PIN Code</label>
              <input
                type="text"
                id="pin"
                className="w-full border rounded px-3 py-2"
                placeholder="560078"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onBlur={() => fetchCityState(pin)}
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1 font-medium">City</label>
              <input type="text" id="city" value={city} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
            <div>
              <label htmlFor="state" className="block mb-1 font-medium">State</label>
              <input type="text" id="state" value={state} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
          </div>

          <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded">Validate & Submit</button>
        </>
      )}
    </div>
  );
}

export default DynamicForm;
