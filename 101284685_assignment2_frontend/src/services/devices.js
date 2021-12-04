import axios from 'axios';

import { API_BASE_URL } from '@Constants/config';
import { apiWrapper } from './interceptors';
// const host = window.location.origin;

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
});

const devicesApi = {
  getDevices: (body) => {
    return new Promise((resolve, reject) => {
      request
        .get('/devices')
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },

  addDevice: (body) => {
    return new Promise((resolve, reject) => {
      request
        .post('/devices', { ...body })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },

  deleteDevice: (id) => {
    return new Promise((resolve, reject) => {
      request
        .delete(`/devices/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },

  editDevice: (body) => {
    return new Promise((resolve, reject) => {
      request
        .put(`/devices/${body.id}`, { ...body })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },

  getDevice: (id) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/devices/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  },
};

export default apiWrapper(devicesApi, ['getDevices', 'addDevice', 'deleteDevice', 'getDevice']);
