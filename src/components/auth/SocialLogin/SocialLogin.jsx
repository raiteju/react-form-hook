import { toast } from 'react-toastify';
import './SocialLogin.css';

const SocialLogin = ({ onSocialLogin }) => {
  const handleSocialLogin = (provider) => {
    toast.info(`Connecting to ${provider}...`, {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      toast.success(`Successfully logged in with ${provider}! 🎉`, {
        position: "top-right",
        autoClose: 4000,
      });
      
      onSocialLogin(provider);
    }, 1500);
  };

  return (
    <div className="social-login-section">
      <div className="divider">
        <span>or continue with</span>
      </div>
      <div className="social-buttons">
        <button 
          className="social-btn google"
          onClick={() => handleSocialLogin('Google')}
        >
          <svg className="social-icon" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Continue with Google
        </button>
        
        <button 
          className="social-btn github"
          onClick={() => handleSocialLogin('GitHub')}
        >
          <svg className="social-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.61.07-.61a2.12,2.12,0,0,1,1.55,1.06,2.16,2.16,0,0,0,2.95.83,2.2,2.2,0,0,1,.65-1.37c-2.24-.25-4.6-1.12-4.6-5a3.87,3.87,0,0,1,1-2.65,3.61,3.61,0,0,1,.1-2.62s.84-.27,2.75,1a9.49,9.49,0,0,1,5,0c1.91-1.28,2.75-1,2.75-1a3.61,3.61,0,0,1,.1,2.62,3.87,3.87,0,0,1,1,2.65c0,3.89-2.36,4.74-4.61,5a2.38,2.38,0,0,1,.68,1.87V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"/>
          </svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;