import axios from 'axios';
import AuthenticationHelper from '../helpers/AuthenticationHelper';

class CategoryService {
  static getCategories() {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .get('http://localhost:5000/api/category', config)
      .then((res) => {
        return res.data;
      });
  }
  static addCategory(category) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .post('http://localhost:5000/api/category', category, config)
      .then((res) => {
        return res.data;
      });
  }
  static deleteCategory(category) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .delete('http://localhost:5000/api/category/' + category._id, config)
      .then((res) => {
        return res.data;
      });
  }
  static editCategory(category) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .put(
        'http://localhost:5000/api/category/' + category._id,
        category,
        config
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default CategoryService;
