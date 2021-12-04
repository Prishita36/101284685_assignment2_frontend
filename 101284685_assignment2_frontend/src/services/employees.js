import axios from 'axios';

import { API_BASE_URL } from '@Constants/config';
import { apiWrapper } from './interceptors';
// const host = window.location.origin;

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
});

const employeesApi = {
  getEmployees: (body) => {
    return new Promise((resolve, reject) => {
      request
        .get('/api/v1/employees')
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  addEmployee: (body) => {
    return new Promise((resolve, reject) => {
      request
        .post('/api/v1/employees', { ...body })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  deleteEmployee: (id) => {
    return new Promise((resolve, reject) => {
      request
        .delete(`/api/v1/employees/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getEmployee: (id) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/api/v1/employees/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  editEmployee: (body) => {
    return new Promise((resolve, reject) => {
      request
        .put(`/api/v1/employees/${body.id}`, { ...body })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },
};

export default apiWrapper(employeesApi, [
  'getEmployees',
  'addEmployee',
  'deleteEmployee',
  'getEmployee',
  'editEmployee',
]);
