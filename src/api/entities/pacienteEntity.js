import UserEntity from './userEntity';

class PacienteEntity {
  constructor({ id, psicologo, historico, usuario }) {
    this.id = id;
    this.psicologoId = psicologo?.id || null;
    this.historico = historico || [];
    this.usuario = usuario ? new UserEntity(usuario) : null;
  }
}

export default PacienteEntity;
