import apiClient from '../apiClient';
import ResumoEntity from '../entities/resumoEntity';

const ResumoService = {
  // Inserir novos resumos clínicos
  inserir: async (resumos) => {
    const response = await apiClient.post('/api/v1/resumo', resumos);
    return response.data.map((resumo) => new ResumoEntity(resumo));
  },

  // Remover resumos por lista de IDs
  remover: async (ids) => {
    await apiClient.delete('/api/v1/resumo', { data: ids });
  },

  // Buscar resumo por ID
  buscarPorId: async (id) => {
    const response = await apiClient.get(`/api/v1/resumo/${id}`);
    return new ResumoEntity(response.data);
  },

  // Listar todos os resumos com paginação
  listarTodos: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc') => {
    const response = await apiClient.get('/api/v1/resumo', {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });

    return {
      resumos: response.data.content.map((resumo) => new ResumoEntity(resumo)),
      totalElements: response.data.totalElements,
      pageNumber: response.data.pageable.pageNumber,
      pageSize: response.data.pageable.pageSize,
    };
  },
};

export default ResumoService;
