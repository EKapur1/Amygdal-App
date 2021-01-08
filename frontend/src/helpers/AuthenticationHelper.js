class AuthenticationHelper {
  static getToken() {
    return JSON.parse(localStorage.getItem('token')) || null;
  }

  static setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static async removeToken() {
    localStorage.removeItem('token');
  }

  static async validatePassword(password, repeatPassword) {
    return password === repeatPassword;
  }
}

export default AuthenticationHelper;
