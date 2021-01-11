import AuthenticationHelper from '../helpers/AuthenticationHelper';
import axios from 'axios';

class UserService {
  static getUser() {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios.get('http://localhost:5000/api/users', config).then((res) => {
      return {
        loaded: true,
        avatar: res.data.avatar,
        name: res.data.name,
        surname: res.data.surname,
        phone: res.data.phone,
        email: res.data.email,
        date: res.data.date,
      };
    });
  }
}

export default UserService;
