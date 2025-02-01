import UserEntity from './userEntity';
import PacienteEntity from './pacienteEntity';

class PsicologoEntity {
  constructor({ id, crm, pacientes, usuario }) {
    this.id = id;
    this.crm = crm;
    this.pacientes = pacientes ? pacientes.map((p) => new PacienteEntity(p)) : [];
    this.usuario = usuario ? new UserEntity(usuario) : null;
  }
}

export default PsicologoEntity;
