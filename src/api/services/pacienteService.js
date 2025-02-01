import apiClient from '../apiClient';
import PacienteEntity from '../entities/pacienteEntity';

const PacienteService = {
  // Inserir paciente
  inserir: async (pacientes) => {
    const response = await apiClient.post('/api/v1/paciente', pacientes);
    return response.data.map((paciente) => new PacienteEntity(paciente));
  },

  // Alterar paciente
  alterar: async (pacientes) => {
    const response = await apiClient.put('/api/v1/paciente', pacientes);
    return response.data.map((paciente) => new PacienteEntity(paciente));
  },

  // Remover paciente por lista de IDs
  remover: async (ids) => {
    await apiClient.delete('/api/v1/paciente', { data: ids });
  },

  // Buscar paciente por ID
  buscarPorId: async (id) => {
    const response = await apiClient.get(`/api/v1/paciente/${id}`);
    return new PacienteEntity(response.data);
  },

  // Listar todos os pacientes com paginação
  listarTodos: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc') => {
    const response = await apiClient.get('/api/v1/paciente', {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });
    return {
      content: response.data.content.map((paciente) => new PacienteEntity(paciente)),
      totalElements: response.data.totalElements,
      pageable: response.data.pageable,
    };
  },

  // Novo método para listar com paginação e filtro
  listarComPaginacao: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc', filtro) => {
    const response = await apiClient.post('/api/v1/paciente/paginacao', filtro, {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });
    return {
      content: response.data.content.map((paciente) => new PacienteEntity(paciente)),
      totalElements: response.data.totalElements,
      pageable: response.data.pageable,
    };
  },

  // Novo método para buscar por critério
  buscarPorCriterio: async (filtro) => {
    const response = await apiClient.post('/api/v1/paciente/pesquisa', filtro);
    return response.data.map((paciente) => new PacienteEntity(paciente));
  },
};

export default PacienteService;
