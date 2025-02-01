import apiClient from '../api/apiClient';
import UsuarioEntity from '../entities/usuarioEntity';

const UsuarioService = {
  // Inserir novos usuários
  inserir: async (usuarios) => {
    const response = await apiClient.post('/api/v1/usuario', usuarios);
    return response.data.map((usuario) => new UsuarioEntity(usuario));
  },

  // Alterar usuários existentes
  alterar: async (usuarios) => {
    const response = await apiClient.put('/api/v1/usuario', usuarios);
    return response.data.map((usuario) => new UsuarioEntity(usuario));
  },

  // Remover usuários por lista de IDs
  remover: async (ids) => {
    await apiClient.delete('/api/v1/usuario', { data: ids });
  },

  // Buscar usuário por ID
  buscarPorId: async (id) => {
    const response = await apiClient.get(`/api/v1/usuario/${id}`);
    return new UsuarioEntity(response.data);
  },

  // Listar todos os usuários com paginação
  listarTodos: async (pagina = 0, tamanho = 10, campoOrdem = 'id', direcaoOrdem = 'asc') => {
    const response = await apiClient.get('/api/v1/usuario', {
      params: { pagina, tamanho, campoOrdem, direcaoOrdem },
    });

    return {
      usuarios: response.data.content.map((usuario) => new UsuarioEntity(usuario)),
      totalElements: response.data.totalElements,
      pageNumber: response.data.pageable.pageNumber,
      pageSize: response.data.pageable.pageSize,
    };
  },
};

export default UsuarioService;
