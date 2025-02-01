class UserEntity {
  constructor({ id, nome, email, authorities }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.role = authorities[0].authority;
  }
}

export default UserEntity;
