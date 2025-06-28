import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const PatientsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const cookieData = Cookies.get('patientsList'); // shared cookie name from patient component
    if (cookieData) {
      setAppointments(JSON.parse(cookieData));
    }
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...appointments];
    updated[index].status = status;
    setAppointments(updated);
    Cookies.set('patientsList', JSON.stringify(updated), { expires: 7 });
  };

  return (
    <div className="patients-list-container">
      <h2>📋 Appointments List</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Hospital</th>
              <th>Time</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => (
              <tr key={appt.id}>
                <td>{appt.patient}</td>
                <td>{appt.name}</td>
                <td>{appt.specialization}</td>
                <td>{appt.hospital}</td>
                <td>{new Date(appt.time).toLocaleString()}</td>
                <td>₹{appt.paid}</td>
                <td style={{ color: appt.status === 'Accepted' ? 'green' : appt.status === 'Rejected' ? 'red' : 'orange' }}>
                  {appt.status || 'Pending'}
                </td>
                <td>
                  {appt.status !== 'Accepted' && (
                    <button onClick={() => updateStatus(idx, 'Accepted')} className="accept-btn">✅ Accept</button>
                  )}
                  {appt.status !== 'Rejected' && (
                    <button onClick={() => updateStatus(idx, 'Rejected')} className="reject-btn">❌ Reject</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsList;
