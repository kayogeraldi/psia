import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user';
const AUTH_KEY = '@auth';
const NOTIFICATIONS_KEY = '@notifications';
const QUIZ_KEY = '@quiz';

const UserDB = {
  // Autenticação
  setAuthData: async (token, userData) => {
    try {
      await AsyncStorage.multiSet([
        [AUTH_KEY + ':token', token],
        [USER_KEY + ':data', JSON.stringify(userData)]
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados de autenticação:', error);
      throw error;
    }
  },

  getAuthToken: async () => {
    try {
      return await AsyncStorage.getItem(AUTH_KEY + ':token');
    } catch (error) {
      console.error('Erro ao buscar token:', error);
      return null;
    }
  },

  getUserData: async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY + ':data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  },

  clearAuthData: async () => {
    try {
      await AsyncStorage.multiRemove([
        AUTH_KEY + ':token',
        USER_KEY + ':data'
      ]);
    } catch (error) {
      console.error('Erro ao limpar dados de autenticação:', error);
      throw error;
    }
  },

  // Notificações
  setNotificationSettings: async (settings) => {
    try {
      await AsyncStorage.setItem(
        NOTIFICATIONS_KEY + ':settings', 
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('Erro ao salvar configurações de notificação:', error);
      throw error;
    }
  },

  getNotificationSettings: async () => {
    try {
      const settings = await AsyncStorage.getItem(NOTIFICATIONS_KEY + ':settings');
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Erro ao buscar configurações de notificação:', error);
      return null;
    }
  },

  // Quiz
  saveQuizRegistro: async (registro) => {
    try {
      const registros = await UserDB.getQuizRegistros();
      registros.push(registro);
      await AsyncStorage.setItem(
        QUIZ_KEY + ':registros', 
        JSON.stringify(registros)
      );
    } catch (error) {
      console.error('Erro ao salvar registro do quiz:', error);
      throw error;
    }
  },

  getQuizRegistros: async () => {
    try {
      const registros = await AsyncStorage.getItem(QUIZ_KEY + ':registros');
      return registros ? JSON.parse(registros) : [];
    } catch (error) {
      console.error('Erro ao buscar registros do quiz:', error);
      return [];
    }
  },

  clearQuizRegistros: async () => {
    try {
      await AsyncStorage.removeItem(QUIZ_KEY + ':registros');
    } catch (error) {
      console.error('Erro ao limpar registros do quiz:', error);
      throw error;
    }
  }
};

export default UserDB; 