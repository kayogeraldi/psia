import apiClient from '../apiClient';
import RpdEntity from '../entities/rpdEntity';

const RpdService = {
  // Inserir novos RPDs
  inserir: async (rpds) => {
    const response = await apiClient.post('/api/v1/rpd', rpds);
    return response.data.map((rpd) => new RpdEntity(rpd));
  },

  // Alterar RPDs existentes
  alterar: async (rpds) => {
    const response = await apiClient.put('/api/v1/rpd', rpds);
    return response.data.map((rpd) => new RpdEntity(rpd));
  },

  // Remover RPDs por lista de IDs
  remover: async (ids) => {
    await apiClient.delete('/api/v1/rpd', { data: ids });
  },

  // Buscar RPD por ID
  buscarPorId: async (id) => {
    const response = await apiClient.get(`/api/v1/rpd/${id}`);
    return new RpdEntity(response.data);
  },

  // Listar todos os RPDs com paginação
  listarTodos: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc') => {
    const response = await apiClient.get('/api/v1/rpd', {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });

    return {
      rpds: response.data.content.map((rpd) => new RpdEntity(rpd)),
      totalElements: response.data.totalElements,
      pageNumber: response.data.pageable.pageNumber,
      pageSize: response.data.pageable.pageSize,
    };
  },
};

export default RpdService;
