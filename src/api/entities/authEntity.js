import UserEntity from "./userEntity";

class AuthEntity {
  constructor({ token, usuario }) {
    this.token = token;
    this.user = usuario ? new UserEntity(usuario) : null;
  }
}

export default AuthEntity;
