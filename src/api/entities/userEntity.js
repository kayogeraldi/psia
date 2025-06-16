class UserEntity {
  constructor({ id, nome, email, psicologo, paciente, dataNascimento, authorities }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.psicologo = psicologo;
    this.paciente = paciente;
    this.role = authorities[0].authority;
  }
}

export default UserEntity;
