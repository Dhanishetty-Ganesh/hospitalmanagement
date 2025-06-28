import React from 'react';
import './index.css';
import heroBanner from '../../assets/hero-banner.png';

const LandingPage = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <p className="subtitle">Welcome to KristalCare</p>
          <h1 className="title">Modern Hospital & Appointment System</h1>
          <p className="desc">Book doctors. Manage hospitals. Track consultations and revenue seamlessly.</p>
          <button className="cta-btn">Get Started</button>
        </div>
        <div className="hero-img">
          <img src={heroBanner} alt="Hospital" />
        </div>
      </section>

      {/* 🔽 New Features Section */}
      <section className="features-section">
        <h2>💡 Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Doctor Booking</h3>
            <p>Instantly schedule appointments with verified doctors across specialties.</p>
          </div>
          <div className="feature-card">
            <h3>Hospital Management</h3>
            <p>Manage hospital staff, departments, and revenue tracking with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Analytics Dashboard</h3>
            <p>Interactive dashboards for patients, doctors, and admins with real-time stats.</p>
          </div>
        </div>
      </section>

      {/* 🔽 New How It Works Section */}
      <section className="how-section">
        <h2>⚙️ How It Works</h2>
        <ol className="steps-list">
          <li><strong>Register:</strong> Create an account as patient, doctor, or admin.</li>
          <li><strong>Choose:</strong> Filter and book your preferred doctor or facility.</li>
          <li><strong>Manage:</strong> Monitor appointments, earnings, and records from one place.</li>
        </ol>
      </section>

      {/* 🔽 New Why Us Section */}
      <section className="why-section">
        <h2>🌟 Why Choose KristalCare?</h2>
        <p>
          Trusted by hundreds of hospitals and thousands of patients. Secure, scalable, and built for the future of healthcare.
        </p>
        <button className="cta-btn secondary">Explore More</button>
      </section>
    </>
  );
};

export default LandingPage;
