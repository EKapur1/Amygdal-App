import axios from 'axios';
import AuthenticationHelper from '../helpers/AuthenticationHelper';

class TaskService {
  static switchCategories(oldCategory, newCategory, task) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .put(
        'http://localhost:5000/api/category/tasks/' +
          oldCategory._id +
          '/' +
          newCategory._id,
        { task: task },
        config
      )
      .then((res) => {
        return res.data;
      });
  }
  static addTask(category, task) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .put(
        'http://localhost:5000/api/category/tasks/' + category._id,
        task,
        config
      )
      .then((res) => {
        return res.data;
      });
  }
  static deleteTask(category, task) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .delete(
        'http://localhost:5000/api/category/' + category._id + '/' + task._id,
        config
      )
      .then((res) => {
        return res.data;
      });
  }
  static editTask(category, task) {
    let config = {
      headers: {
        'x-auth-token': AuthenticationHelper.getToken(),
      },
    };
    return axios
      .put(
        'http://localhost:5000/api/category/' + category._id + '/' + task._id,
        task,
        config
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default TaskService;
