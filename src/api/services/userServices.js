import apiClient from '../apiClient';
import UserEntity from '../entities/userEntity';

const UserService = {
  updateProfile: async (profileData) => {
    const response = await apiClient.post('/update-profile', profileData);
    return new UserEntity(response.data);
  },
};

export default UserService;