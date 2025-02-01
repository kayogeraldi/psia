import axios from 'axios';
import UserDB from '../db/userDB';

const apiClient = axios.create({
  baseURL: 'http://firesamurai.fun:9091',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT nas requisições
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await UserDB.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros nas respostas
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      try {
        await UserDB.clearAuthData();
      } catch (clearError) {
        console.error('Erro ao limpar dados de autenticação:', clearError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;