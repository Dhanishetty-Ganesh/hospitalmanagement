import React from 'react';
import './index.css';
import {
  Bar,
  Doughnut,
  Pie
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({ userType = 'admin' }) => {
  const doctorStats = {
    earnings: 120000,
    consultations: 30,
    hospitalBreakdown: [
      { hospital: 'City Hospital', amount: 70000 },
      { hospital: 'Sunrise Medical', amount: 50000 }
    ]
  };

  const adminStats = {
    totalRevenue: 200000,
    consultations: 50,
    doctors: 10,
    revenueByDoctor: [
      { name: 'Dr. A Sharma', amount: 60000 },
      { name: 'Dr. B Khan', amount: 50000 },
      { name: 'Dr. Meera S', amount: 40000 }
    ],
    revenueByDept: [
      { dept: 'Cardiology', amount: 80000 },
      { dept: 'Orthopedics', amount: 60000 },
      { dept: 'Neurology', amount: 60000 }
    ]
  };

  const patientStats = {
    consultations: 5,
    history: [
      { name: 'Dr. A Sharma', hospital: 'City Hospital', fee: 500, time: '2025-07-01T10:00' },
      { name: 'Dr. B Khan', hospital: 'Sunrise Medical', fee: 600, time: '2025-07-01T11:00' }
    ]
  };

  // Charts config
  const barData = {
    labels: adminStats.revenueByDoctor.map(d => d.name),
    datasets: [{
      label: 'Revenue by Doctor',
      data: adminStats.revenueByDoctor.map(d => d.amount),
      backgroundColor: ['#4caf50', '#f44336', '#2196f3']
    }]
  };

  const pieData = {
    labels: adminStats.revenueByDept.map(d => d.dept),
    datasets: [{
      label: 'Revenue by Department',
      data: adminStats.revenueByDept.map(d => d.amount),
      backgroundColor: ['#ff9800', '#3f51b5', '#009688']
    }]
  };

  const doughnutData = {
    labels: doctorStats.hospitalBreakdown.map(d => d.hospital),
    datasets: [{
      label: 'Earnings by Hospital',
      data: doctorStats.hospitalBreakdown.map(d => d.amount),
      backgroundColor: ['#9c27b0', '#00bcd4']
    }]
  };

  return (
    <div className="dashboard">
      <h2>📊 {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard</h2>

      {userType === 'doctor' && (
        <div className="grid">
          <div className="card blue"><h3>Total Earnings</h3><p>₹{doctorStats.earnings}</p></div>
          <div className="card green"><h3>Total Consultations</h3><p>{doctorStats.consultations}</p></div>
          <div className="card"><h3>Earnings by Hospital</h3><Doughnut data={doughnutData} /></div>
        </div>
      )}

      {userType === 'admin' && (
        <>
          <div className="grid">
            <div className="card green"><h3>Total Revenue</h3><p>₹{adminStats.totalRevenue}</p></div>
            <div className="card yellow"><h3>Total Consultations</h3><p>{adminStats.consultations}</p></div>
            <div className="card red"><h3>Total Doctors</h3><p>{adminStats.doctors}</p></div>
          </div>
          <div className="grid">
            <div className="card"><h3>Revenue by Doctor</h3><Bar data={barData} /></div>
            <div className="card"><h3>Revenue by Department</h3><Pie data={pieData} /></div>
          </div>
        </>
      )}

      {userType === 'patient' && (
        <div className="grid">
          <div className="card yellow"><h3>Total Visits</h3><p>{patientStats.consultations}</p></div>
          <div className="card light">
            <h3>History</h3>
            <ul>
              {patientStats.history.map((visit, idx) => (
                <li key={idx}>
                  {visit.name} at {visit.hospital} - ₹{visit.fee} on {new Date(visit.time).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
