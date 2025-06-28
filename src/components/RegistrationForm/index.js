import React, { useState } from 'react';
import './index.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const RegistrationForm = () => {
  const [isLogin, setIsLogin] = useState(false); // default to Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // only for registration

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setRole('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword || (!isLogin && !role)) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (
        !storedUser ||
        storedUser.email !== trimmedEmail ||
        storedUser.password !== trimmedPassword
      ) {
        alert('Invalid email or password.');
        return;
      }

      // ✅ Login success
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', storedUser.role);
      localStorage.setItem('username', storedUser.email);

      window.location.href = `/${storedUser.role}`; // Redirect based on role
    } else {
      // ✅ Registration
      const user = {
        email: trimmedEmail,
        password: trimmedPassword,
        role,
      };
      localStorage.setItem('user', JSON.stringify(user));
      alert('🎉 Registration successful! Please log in.');
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? '🔐 Login to KristalCare' : '📝 Register to KristalCare'}</h2>

        {/* Email Field */}
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Selection (only on Register) */}
        {!isLogin && (
          <div className="input-group">
            <FaUser className="icon" />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">-- Select Role --</option>
              <option value="admin">🏥 Hospital Admin</option>
              <option value="doctor">👨‍⚕️ Doctor</option>
              <option value="patient">👤 Patient</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="auth-btn">
          {isLogin ? 'Login' : 'Register'}
        </button>

        {/* Toggle Text */}
        <div className="auth-bottom-text">
          {isLogin ? 'New user? ' : 'Already registered? '}
          <span className="auth-toggle-link" onClick={toggleMode}>
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
