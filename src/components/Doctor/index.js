import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const Doctor = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    qualifications: '',
    specializations: [],
    experience: '',
    fee: '',
    availability: '',
    hospital: ''
  });

  const specializationOptions = [
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'Neurology',
    'Dermatology'
  ];

  const handleInputChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSpecializationChange = (e) => {
    const { value, checked } = e.target;
    setDoctor((prev) => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, value]
        : prev.specializations.filter((spec) => spec !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDoctor = {
      id: Date.now(),
      name: doctor.name,
      specialization: doctor.specializations[0] || 'General',
      hospital: doctor.hospital,
      time: doctor.availability,
      fee: Number(doctor.fee)
    };

    // Save to cookies
    const existing = JSON.parse(Cookies.get('registeredDoctors') || '[]');
    const updated = [...existing, formattedDoctor];
    Cookies.set('registeredDoctors', JSON.stringify(updated), { expires: 7 });

    alert('✅ Doctor Registered Successfully!');
    setDoctor({
      name: '',
      qualifications: '',
      specializations: [],
      experience: '',
      fee: '',
      availability: '',
      hospital: ''
    });
  };

  return (
    <div className="doctor-form-container">
      <h2>👨‍⚕️ Register Doctor</h2>
      <form onSubmit={handleSubmit} className="doctor-form">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="qualifications"
          placeholder="Qualifications"
          value={doctor.qualifications}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={doctor.experience}
          onChange={handleInputChange}
          required
        />

        <div className="multi-select">
          <label>Specializations:</label>
          <div className="checkboxes">
            {specializationOptions.map((spec, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  value={spec}
                  checked={doctor.specializations.includes(spec)}
                  onChange={handleSpecializationChange}
                /> {spec}
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="hospital"
          placeholder="Associated Hospital"
          value={doctor.hospital}
          onChange={handleInputChange}
          required
        />

        <input
          type="datetime-local"
          name="availability"
          value={doctor.availability}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="fee"
          placeholder="Consultation Fee (₹)"
          value={doctor.fee}
          onChange={handleInputChange}
          required
        />

        <button type="submit" className="submit-btn">Register Doctor</button>
      </form>
    </div>
  );
};

export default Doctor;
