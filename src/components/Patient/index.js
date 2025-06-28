import React, { useState, useEffect } from 'react';
import './index.css';
import Cookies from 'js-cookie';

const defaultDoctors = [
  {
    name: 'Dr. A Sharma',
    specialization: 'Cardiology',
    hospital: 'City Hospital',
    time: '2025-07-01T10:00',
    fee: 500,
  },
  {
    name: 'Dr. B Khan',
    specialization: 'Orthopedics',
    hospital: 'Sunrise Medical',
    time: '2025-07-01T11:00',
    fee: 600,
  },
];

function Patient() {
  const [filters, setFilters] = useState({ specialization: '', hospital: '' });
  const [history, setHistory] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalData, setModalData] = useState({ name: '', age: '', problem: '', paid: '' });
  const [showModal, setShowModal] = useState(false);
  const [allDoctors, setAllDoctors] = useState(defaultDoctors);

  const patientEmail = localStorage.getItem('username') || 'anonymous';

  // ✅ Load appointment history
  useEffect(() => {
    const cookieData = Cookies.get(`history_${patientEmail}`);
    if (cookieData) {
      setHistory(JSON.parse(cookieData));
    }
  }, [patientEmail]);

  // ✅ Load doctors from cookies and merge with default doctors
  useEffect(() => {
    const cookieDocs = JSON.parse(Cookies.get('registeredDoctors') || '[]');
    setAllDoctors([...defaultDoctors, ...cookieDocs]);
  }, []);

  const saveHistory = (updatedHistory) => {
    setHistory(updatedHistory);
    Cookies.set(`history_${patientEmail}`, JSON.stringify(updatedHistory), { expires: 7 });

    const sharedList = JSON.parse(Cookies.get('patientsList') || '[]');
    const merged = [...sharedList.filter(s => s.patient !== patientEmail), ...updatedHistory];
    Cookies.set('patientsList', JSON.stringify(merged), { expires: 7 });
  };

  const filteredDoctors = allDoctors.filter(
    (doc) =>
      (filters.specialization === '' || doc.specialization === filters.specialization) &&
      (filters.hospital === '' || doc.hospital === filters.hospital)
  );

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalData({ name: '', age: '', problem: '', paid: doctor.fee });
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const { name, age, problem, paid } = modalData;
    if (!name || !age || !problem || !paid || isNaN(paid)) {
      alert('❗ Please fill all fields with valid values');
      return;
    }

    const appointment = {
      id: Date.now(),
      ...selectedDoctor,
      patient: patientEmail,
      patientName: name,
      age,
      problem,
      paid,
      status: 'pending',
    };

    const updated = [...history, appointment];
    saveHistory(updated);
    setShowModal(false);
  };

  const handleDelete = (index) => {
    if (!window.confirm('Are you sure?')) return;
    const updated = [...history];
    updated.splice(index, 1);
    saveHistory(updated);
  };

  const handleUpdate = (index) => {
    const newAmount = prompt('Enter new amount:', history[index].paid);
    if (!newAmount || isNaN(newAmount)) return;
    const updated = [...history];
    updated[index].paid = Number(newAmount);
    saveHistory(updated);
  };

  return (
    <div className="patient-container">
      <h2>👤 Available Doctors:</h2>

      <div className="filters">
        <select onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}>
          <option value="">All Specializations</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, hospital: e.target.value })}>
          <option value="">All Hospitals</option>
          <option value="City Hospital">City Hospital</option>
          <option value="Sunrise Medical">Sunrise Medical</option>
        </select>
      </div>

      <div className="doctor-list">
        {filteredDoctors.map((doc, idx) => (
          <div key={idx} className="doctor-card">
            <h4>{doc.name}</h4>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Hospital:</strong> {doc.hospital}</p>
            <p><strong>Time:</strong> {new Date(doc.time).toLocaleString()}</p>
            <p><strong>Fee:</strong> ₹{doc.fee}</p>
            <button onClick={() => openBookingModal(doc)}>📅 Add Appointment</button>
          </div>
        ))}
      </div>

      <div className="history">
        <h3>📋 Consultation History</h3>
        {history.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul>
            {history.map((item, idx) => (
              <li key={item.id}>
                {item.patientName} ({item.age}) - {item.problem} with {item.name} at {item.hospital} on {new Date(item.time).toLocaleString()} - ₹{item.paid}
                <strong> | Status:</strong>{' '}
                <span style={{ color: item.status === 'accepted' ? 'green' : item.status === 'rejected' ? 'red' : 'orange' }}>
                  {item.status}
                </span>
                <div className="history-actions">
                  <button className="update-btn" onClick={() => handleUpdate(idx)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(idx)}>🗑️ Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Modal for Appointment */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Book Appointment with {selectedDoctor.name}</h3>
            <input type="text" placeholder="Your Name" value={modalData.name} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} />
            <input type="number" placeholder="Your Age" value={modalData.age} onChange={(e) => setModalData({ ...modalData, age: e.target.value })} />
            <input type="text" placeholder="Your Problem" value={modalData.problem} onChange={(e) => setModalData({ ...modalData, problem: e.target.value })} />
            <input type="number" placeholder="Consultation Amount" value={modalData.paid} onChange={(e) => setModalData({ ...modalData, paid: e.target.value })} />
            <div className="modal-buttons">
              <button onClick={handleModalSubmit}>✅ Submit</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patient;
