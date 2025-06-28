import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const HospitalAdmin = () => {
  const [hospitalInfo, setHospitalInfo] = useState({ name: '', location: '' });
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState('');
  const [doctors, setDoctors] = useState([]);

  // Dashboard metrics
  const [consultations, setConsultations] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revByDoctor, setRevByDoctor] = useState([]);
  const [revByDept, setRevByDept] = useState([]);

  // Load registered doctors
  useEffect(() => {
    const cookieDoctors = Cookies.get('registeredDoctors');
    if (cookieDoctors) setDoctors(JSON.parse(cookieDoctors));
  }, []);

  // Compute dashboard metrics any time doctors or hospital changes
  useEffect(() => {
    const allAppts = JSON.parse(Cookies.get('patientsList') || '[]');
    const myAppts = allAppts.filter(a => a.hospital === hospitalInfo.name);

    setConsultations(myAppts.length);
    setTotalRevenue(myAppts.reduce((sum, a) => sum + Number(a.paid), 0));

    // Revenue by doctor
    const byDoc = {};
    myAppts.forEach(a => {
      byDoc[a.name] = (byDoc[a.name] || 0) + Number(a.paid);
    });
    setRevByDoctor(Object.entries(byDoc).map(([name, amt]) => ({ name, amount: amt })));

    // Revenue by department (using doctor.specialization)
    const byDept = {};
    myAppts.forEach(a => {
      const dept = a.specialization;
      byDept[dept] = (byDept[dept] || 0) + Number(a.paid);
    });
    setRevByDept(Object.entries(byDept).map(([dept, amt]) => ({ dept, amount: amt })));
  }, [hospitalInfo.name, doctors]);

  // Handlers for hospital info
  const handleHospitalChange = e => {
    setHospitalInfo({ ...hospitalInfo, [e.target.name]: e.target.value });
  };

  const handleAddDept = () => {
    if (newDept.trim() && !departments.includes(newDept)) {
      setDepartments([...departments, newDept.trim()]);
      setNewDept('');
    }
  };

  const handleRemoveDept = dept => {
    setDepartments(departments.filter(d => d !== dept));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('🏥 Hospital Registered Successfully!');
    setHospitalInfo({ name: '', location: '' });
    setDepartments([]);
  };

  // Delete a doctor
  const deleteDoctor = index => {
    if (!window.confirm('Delete this doctor?')) return;
    const updated = [...doctors];
    updated.splice(index, 1);
    setDoctors(updated);
    Cookies.set('registeredDoctors', JSON.stringify(updated), { expires: 7 });
  };

  return (
    <div className="hospital-admin">
      <h2>🏥 Hospital Admin Panel</h2>

      {/* 🗂️ Dashboard */}
      <div className="admin-dashboard">
        <div className="card green">
          <h3>Total Consultations</h3>
          <p>{consultations}</p>
        </div>
        <div className="card blue">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
        <div className="card purple">
          <h3>Revenue by Doctor</h3>
          <ul>
            {revByDoctor.map((d, i) => (
              <li key={i}>{d.name}: ₹{d.amount}</li>
            ))}
          </ul>
        </div>
        <div className="card yellow">
          <h3>Revenue by Department</h3>
          <ul>
            {revByDept.map((d, i) => (
              <li key={i}>{d.dept}: ₹{d.amount}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr />

      {/* 🏥 Hospital Registration */}
      <h3>Register Hospital</h3>
      <form onSubmit={handleSubmit} className="hospital-form">
        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          value={hospitalInfo.name}
          onChange={handleHospitalChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={hospitalInfo.location}
          onChange={handleHospitalChange}
          required
        />
        <div className="dept-section">
          <h4>Departments</h4>
          <div className="dept-input">
            <input
              type="text"
              value={newDept}
              onChange={e => setNewDept(e.target.value)}
              placeholder="Enter department name"
            />
            <button type="button" onClick={handleAddDept}>Add</button>
          </div>
          <ul className="dept-list">
            {departments.map((dept, i) => (
              <li key={i}>
                {dept} <span onClick={() => handleRemoveDept(dept)}>❌</span>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="submit-btn">Register Hospital</button>
      </form>

      {/* 👩‍⚕️ Manage Doctors */}
      <hr />
      <div className="doctor-management">
        <h3>Registered Doctors</h3>
        {doctors.length === 0 ? (
          <p>No doctors registered.</p>
        ) : (
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specializations</th>
                <th>Hospital</th>
                <th>Fee</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr key={idx}>
                  <td>{doc.name}</td>
                  <td>
                    {Array.isArray(doc.specializations)
                      ? doc.specializations.join(', ')
                      : doc.specialization}
                  </td>
                  <td>{doc.hospital}</td>
                  <td>₹{doc.fee}</td>
                  <td>
                    {new Date(doc.availability || doc.time).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteDoctor(idx)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HospitalAdmin;
