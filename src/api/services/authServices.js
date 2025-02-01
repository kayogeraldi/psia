import apiClient from '../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthEntity from '../entities/authEntity';

const AuthService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    const authData = new AuthEntity(response.data);

    await AsyncStorage.setItem('authToken', authData.token);
    await AsyncStorage.setItem('userData', JSON.stringify(authData.user));
    return authData;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return new AuthEntity(response.data);
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    await AsyncStorage.multiRemove(['authToken', 'userData']);
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        return {
          isAuthenticated: true,
          user: JSON.parse(userData)
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