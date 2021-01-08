import FetchService from './FetchService';
import AuthenticationHelper from 'helpers/AuthenticationHelper';

class AuthenticationService {
  static async login(credentials) {
    const token = await FetchService.post(
      '/login',
      JSON.stringify(credentials)
    );
    AuthenticationHelper.setToken(token);
  }

  static async register(credentials) {
    const token = await FetchService.post(
      '/signup',
      JSON.stringify(credentials)
    );
    AuthenticationHelper.setToken(token);
  }
}

export default AuthenticationService;
