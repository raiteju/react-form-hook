import { useState } from 'react';
import './PasswordInput.css';

const PasswordInput = ({ 
  register, 
  name, 
  label, 
  error, 
  placeholder = " ",
  showStrength = false,
  value = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score++;
    if (password.match(/\d/)) score++;
    if (password.match(/[^a-zA-Z\d]/)) score++;
    
    const strengths = [
      { label: 'Very Weak', color: '#ff4757' },
      { label: 'Weak', color: '#ff6b81' },
      { label: 'Fair', color: '#ffa502' },
      { label: 'Good', color: '#2ed573' },
      { label: 'Strong', color: '#1dd1a1' }
    ];
    
    return { score, ...strengths[score] };
  };

  const strength = getPasswordStrength(value);

  return (
    <div className="password-input-wrapper">
      <div className="floating-group password-group">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          className={error ? 'error' : ''}
        />
        <label>{label}</label>
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
        {error && <span className="error-message">{error.message}</span>}
      </div>

      {showStrength && value && (
        <div className="password-strength">
          <div className="strength-bar">
            <div 
              className="strength-fill" 
              style={{ 
                width: `${(strength.score / 4) * 100}%`,
                background: strength.color
              }}
            />
          </div>
          <span className="strength-label" style={{ color: strength.color }}>
            {strength.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;