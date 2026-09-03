import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { registerSchema } from '../../utils/validation';
import { authService } from '../../services/api';
import PasswordInput from '../../components/common/PasswordInput/PasswordInput';
import SocialLogin from '../../components/auth/SocialLogin/SocialLogin';
import './RegisterPage.css';

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange'
  });

  const registerPassword = watch('password', '');

  const onRegisterSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await authService.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      
      if (response.success) {
        toast.success('Registration successful! 🎉', {
          position: "top-right",
          autoClose: 3000,
        });
        reset();
        setShowSuccessScreen(true);
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Logged in with ${provider}`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (showSuccessScreen) {
    return (
      <div className="register-page">
        <div className="tab-buttons">
          <button onClick={() => window.location.href = '/login'}>Login</button>
          <button className="active">Register</button>
        </div>
        <div className="success-screen">
          <div className="success-icon">🎉</div>
          <h2>Registration Successful!</h2>
          <p>Your account has been created successfully.</p>
          <p className="success-details">
            You can now login with your credentials.
          </p>
          <button 
            className="success-login-btn"
            onClick={() => window.location.href = '/login'}
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="tab-buttons">
        <button onClick={() => window.location.href = '/login'}>Login</button>
        <button className="active">Register</button>
      </div>

      <div className="form-container">
        <h2>Create Account</h2>
        <p>Register to get started</p>

        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <div className="floating-group">
            <input 
              type="text" 
              placeholder=" "
              {...register('fullName')}
              className={errors.fullName ? 'error' : ''}
            />
            <label>Full Name</label>
            {errors.fullName && (
              <span className="error-message">{errors.fullName.message}</span>
            )}
          </div>

          <div className="floating-group">
            <input 
              type="email" 
              placeholder=" "
              {...register('email')}
              className={errors.email ? 'error' : ''}
            />
            <label>Email Address</label>
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <PasswordInput
            register={register}
            name="password"
            label="Password"
            error={errors.password}
            showStrength={true}
            value={registerPassword}
          />

          <PasswordInput
            register={register}
            name="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPassword}
          />

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <SocialLogin onSocialLogin={handleSocialLogin} />

        <p className="switch-text">
          Already have an account?{' '}
          <span onClick={() => window.location.href = '/login'}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;