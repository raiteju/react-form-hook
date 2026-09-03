import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { loginSchema } from '../../utils/validation';
import { useFormPersistence } from '../../hooks/useFormPersistence';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import PasswordInput from '../../components/common/PasswordInput/PasswordInput';
import SocialLogin from '../../components/auth/SocialLogin/SocialLogin';
import ForgotPassword from '../../components/auth/ForgotPassword/ForgotPassword';
import './LoginPage.css';

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { login } = useAuth();

  const [savedLoginData, setSavedLoginData, clearLoginData] = useFormPersistence('loginData', {
    email: '',
    rememberMe: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: savedLoginData.email || '',
      rememberMe: savedLoginData.rememberMe || false
    }
  });

  const loginEmail = watch('email');
  const loginRememberMe = watch('rememberMe');

  // Save login data when email or remember me changes
  useState(() => {
    if (loginEmail) {
      setSavedLoginData({
        email: loginEmail,
        rememberMe: loginRememberMe || false
      });
    }
  }, [loginEmail, loginRememberMe]);

  const onLoginSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password
      });
      
      if (response.success) {
        toast.success('Login successful! 🎉', {
          position: "top-right",
          autoClose: 3000,
        });
        
        login(response.data.user);
        reset();
        if (!loginRememberMe) {
          clearLoginData();
        }
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    const user = {
      name: provider === 'Google' ? 'John Doe' : 'johndoe',
      email: provider === 'Google' ? 'john@gmail.com' : 'john@github.com',
      provider: provider
    };
    login(user);
  };

  return (
    <div className="login-page">
      <div className="tab-buttons">
        <button className="active">Login</button>
        <button onClick={() => window.location.href = '/register'}>Register</button>
      </div>

      <div className="form-container">
        <h2>Welcome Back!</h2>
        <p>Please login to your account</p>

        <form onSubmit={handleSubmit(onLoginSubmit)}>
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
          />

          <div className="form-options">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="remember" 
                {...register('rememberMe')}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot-password">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsForgotPasswordOpen(true);
                }}
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <SocialLogin onSocialLogin={handleSocialLogin} />

        <p className="switch-text">
          Don't have an account?{' '}
          <span onClick={() => window.location.href = '/register'}>
            Register here
          </span>
        </p>
      </div>

      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSwitchToLogin={() => {
          setIsForgotPasswordOpen(false);
        }}
      />
    </div>
  );
};

export default LoginPage;