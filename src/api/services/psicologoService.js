import apiClient from '../apiClient';
import PsicologoEntity from '../entities/psicologoEntity';

const PsicologoService = {
  // Inserir psicólogo
  inserir: async (psicologos) => {
    const response = await apiClient.post('/api/v1/psicologo', psicologos);
    return response.data.map((psicologo) => new PsicologoEntity(psicologo));
  },

  // Alterar psicólogo
  alterar: async (psicologos) => {
    const response = await apiClient.put('/api/v1/psicologo', psicologos);
    return response.data.map((psicologo) => new PsicologoEntity(psicologo));
  },

  // Remover psicólogo por lista de IDs
  remover: async (ids) => {
    await apiClient.delete('/api/v1/psicologo', { data: ids });
  },

  // Buscar psicólogo por ID
  buscarPorId: async (id) => {
    const response = await apiClient.get(`/api/v1/psicologo/${id}`);
    return new PsicologoEntity(response.data);
  },

  // Listar todos os psicólogos com paginação
  listarTodos: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc') => {
    const response = await apiClient.get('/api/v1/psicologo', {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });

    return {
      psicologos: response.data.content.map((psicologo) => new PsicologoEntity(psicologo)),
      totalElements: response.data.totalElements,
      pageNumber: response.data.pageable.pageNumber,
      pageSize: response.data.pageable.pageSize,
    };
  },

  // Vincular paciente a um psicólogo
  vincularPaciente: async (paciente) => {
    const response = await apiClient.post('/api/v1/psicologo/vincular-paciente', paciente);
    return new PsicologoEntity(response.data);
  },
};

export default PsicologoService;
