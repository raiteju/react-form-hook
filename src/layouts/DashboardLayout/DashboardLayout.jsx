import { useAuth } from '../../context/AuthContext';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  
  return <DashboardPage user={user} onLogout={logout} />;
};

export default DashboardLayout;