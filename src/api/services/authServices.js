import apiClient from '../apiClient';
import UserDB from '../../db/userDB';
import AuthEntity from '../entities/authEntity';

const AuthService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    console.log('response:', response.data);
    const authData = new AuthEntity(response.data);
    console.log('authData:', authData);

    await UserDB.setAuthData(authData.token, authData.user);
    return authData;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return new AuthEntity(response.data);
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    await UserDB.clearAuthData();
  },

  checkAuth: async () => {
    try {
      const token = await UserDB.getAuthToken();
      const userData = await UserDB.getUserData();
      
      if (token && userData) {
        return {
          isAuthenticated: true,
          user: userData
        };
      }
      return { isAuthenticated: false, user: null };
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return { isAuthenticated: false, user: null };
    }
  },
};

export default AuthService;