import apiClient from '../api/apiClient';
import RoleEntity from '../entities/roleEntity';

const RoleService = {
  // Inserir novas roles
  inserir: async (roles) => {
    const response = await apiClient.post('/api/v1/role', roles);
    return response.data.map((role) => new RoleEntity(role));
  },

  // Alterar roles existentes
  alterar: async (roles) => {
    const response = await apiClient.put('/api/v1/role', roles);
    return response.data.map((role) => new RoleEntity(role));
  },

  // Remover roles por lista de IDs
  remover: async (ids) => {
    await apiClient.delete('/api/v1/role', { data: ids });
  },

  // Buscar role por ID
  buscarPorId: async (id) => {
    const response = await apiClient.get(`/api/v1/role/${id}`);
    return new RoleEntity(response.data);
  },

  // Listar todas as roles com paginação
  listarTodos: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc') => {
    const response = await apiClient.get('/api/v1/role', {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });

    return {
      roles: response.data.content.map((role) => new RoleEntity(role)),
      totalElements: response.data.totalElements,
      pageNumber: response.data.pageable.pageNumber,
      pageSize: response.data.pageable.pageSize,
    };
  },
};

export default RoleService;
