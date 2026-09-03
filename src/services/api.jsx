const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get users from localStorage
const getUsers = () => {
  const stored = localStorage.getItem('users');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with test user
  const defaultUsers = [
    {
      id: 1,
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'Password@123'
    }
  ];
  localStorage.setItem('users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const authService = {
  register: async (userData) => {
    await delay(1500);
    
    const users = getUsers();
    
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered. Please login.');
    }
    
    const newUser = {
      id: users.length + 1,
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return {
      success: true,
      data: {
        user: {
          id: newUser.id,
          name: newUser.fullName,
          email: newUser.email
        },
        token: 'fake-jwt-token-' + Date.now()
      }
    };
  },

  login: async (credentials) => {
    await delay(1500);
    
    const users = getUsers();
    
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Account not found. Please register first.');
    }
    
    if (user.password !== credentials.password) {
      throw new Error('Invalid password. Please try again.');
    }
    
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email
        },
        token: 'fake-jwt-token-' + Date.now()
      }
    };
  },

  logout: async () => {
    await delay(500);
    return { success: true };
  },

  resetPassword: async (email, newPassword) => {
    await delay(1500);
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      throw new Error('No account found with this email.');
    }
    
    users[userIndex].password = newPassword;
    saveUsers(users);
    
    return { success: true };
  },

  getUsers: () => {
    return getUsers();
  }
};