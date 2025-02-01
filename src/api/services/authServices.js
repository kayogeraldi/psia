import apiClient from '../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthEntity from '../entities/authEntity';

const AuthService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    const authData = new AuthEntity(response.data);

    await AsyncStorage.setItem('authToken', authData.token);
    return authData;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return new AuthEntity(response.data);
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    await AsyncStorage.removeItem('authToken');
  },
};

export default AuthService;