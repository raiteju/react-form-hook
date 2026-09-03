import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { authService } from '../../../services/api';
import './ForgotPassword.css';

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required')
});

const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase, one lowercase, and one number'
    )
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your password')
});

const ForgotPassword = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState('email');
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  });

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    watch: resetWatch
  } = useForm({
    resolver: yupResolver(resetPasswordSchema)
  });

  const newPassword = resetWatch('newPassword', '');

  const onEmailSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const users = authService.getUsers();
      const userExists = users.some(user => user.email === data.email);
      
      if (!userExists) {
        toast.error('No account found with this email address.', {
          position: "top-right",
          autoClose: 4000,
        });
        setIsSubmitting(false);
        return;
      }

      setResetEmail(data.email);
      setStep('reset');
      toast.success('Reset link sent! Please check your email.', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await authService.resetPassword(resetEmail, data.newPassword);

      toast.success('Password reset successful! 🎉', {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        onClose();
        onSwitchToLogin();
      }, 1500);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setResetEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>✕</button>

        {step === 'email' ? (
          <>
            <div className="modal-icon">🔑</div>
            <h2>Forgot Password?</h2>
            <p>Enter your email address and we'll send you a reset link.</p>

            <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
              <div className="floating-group">
                <input
                  type="email"
                  placeholder=" "
                  {...emailRegister('email')}
                  className={emailErrors.email ? 'error' : ''}
                />
                <label>Email Address</label>
                {emailErrors.email && (
                  <span className="error-message">{emailErrors.email.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="modal-switch-text">
              Remember your password?{' '}
              <span onClick={handleClose}>Login here</span>
            </p>
          </>
        ) : (
          <>
            <div className="modal-icon">🔐</div>
            <h2>Reset Password</h2>
            <p>Create a new password for your account.</p>

            <form onSubmit={handleResetSubmit(onResetSubmit)}>
              <div className="floating-group">
                <input
                  type="password"
                  placeholder=" "
                  {...resetRegister('newPassword')}
                  className={resetErrors.newPassword ? 'error' : ''}
                />
                <label>New Password</label>
                {resetErrors.newPassword && (
                  <span className="error-message">{resetErrors.newPassword.message}</span>
                )}
              </div>

              <div className="floating-group">
                <input
                  type="password"
                  placeholder=" "
                  {...resetRegister('confirmPassword')}
                  className={resetErrors.confirmPassword ? 'error' : ''}
                />
                <label>Confirm Password</label>
                {resetErrors.confirmPassword && (
                  <span className="error-message">{resetErrors.confirmPassword.message}</span>
                )}
              </div>

              {newPassword && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${Math.min((newPassword.length / 8) * 100, 100)}%`,
                        background: newPassword.length >= 8 ? '#22c55e' : '#ffa502'
                      }}
                    />
                  </div>
                  <span className="strength-label" style={{ 
                    color: newPassword.length >= 8 ? '#22c55e' : '#ffa502'
                  }}>
                    {newPassword.length >= 8 ? 'Strong' : 'Weak'}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <p className="modal-switch-text">
              <span onClick={() => setStep('email')}>← Back to email</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;