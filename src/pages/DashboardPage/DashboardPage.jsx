import { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage = ({ user, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const dashboardCards = [
    { icon: '👤', title: 'Profile', description: 'Manage your personal information and preferences.', action: 'View Profile' },
    { icon: '🔒', title: 'Security', description: 'Update your password and security settings.', action: 'Security Settings' },
    { icon: '📊', title: 'Activity', description: 'View your recent activity and login history.', action: 'View Activity' },
    { icon: '⚙️', title: 'Settings', description: 'Customize your account settings and preferences.', action: 'Account Settings' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-user-info">
          <div className="user-avatar">
            {getInitials(user?.name || 'User')}
          </div>
          <div className="user-details">
            <h2>{getGreeting()}, {user?.name || 'User'}! 👋</h2>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <div className="welcome-icon">🎉</div>
          <h1>Welcome to Your Dashboard!</h1>
          <p className="welcome-date">{formatDate(currentTime)}</p>
          <p className="welcome-message">
            You have successfully logged in to your account.
            This is your secure dashboard where you can manage your profile and settings.
          </p>
        </div>

        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <div key={index} className="dashboard-card">
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button className="card-btn">{card.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;