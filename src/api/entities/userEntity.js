class UserEntity {
  constructor({ id, nome, email, role }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.role = role?.authority ?? "USUARIO";
  }
}

export default UserEntity;
