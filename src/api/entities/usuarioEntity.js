import RoleEntity from './roleEntity';
import PacienteEntity from './pacienteEntity';
import PsicologoEntity from './psicologoEntity';

class UsuarioEntity {
  constructor({ id, nome, email, password, dataNascimento, paciente, psicologo, role }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.dataNascimento = dataNascimento;
    this.paciente = paciente ? new PacienteEntity(paciente) : null;
    this.psicologo = psicologo ? new PsicologoEntity(psicologo) : null;
    this.role = role ? new RoleEntity(role) : null;
  }
}

export default UsuarioEntity;
