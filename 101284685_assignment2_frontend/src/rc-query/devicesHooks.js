import { useQuery, useMutation } from 'react-query';

import { GET_ALL_DEVICES, ADD_DEVICE_MUT, DELETE_DEVICE_MUT, GET_DEVICE, EDIT_DEVICE_MUT } from './keys';
import devicesApi from '@Services/devices';

export const useGetAllDevices = (body) => {
  const devices = useQuery([GET_ALL_DEVICES], () => devicesApi.getDevices());

  return devices;
};

export const useGetDevice = (id) => {
  const device = useQuery([GET_DEVICE, id], () => devicesApi.getDevice(id));

  return device;
};

export const useAddDeviceMutation = (history) => {
  const response = useMutation(devicesApi.addDevice, {
    mutationKey: ADD_DEVICE_MUT,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log('🚀 ~ Add Device Error', error);
    },
  });
  return response;
};

export const useDeleteDeviceMutation = (history) => {
  const response = useMutation(devicesApi.deleteDevice, {
    mutationKey: DELETE_DEVICE_MUT,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log('🚀 ~ Delete Device Error', error);
    },
  });
  return response;
};

export const useEditDeviceMutation = () => {
  const response = useMutation(devicesApi.editDevice, {
    mutationKey: EDIT_DEVICE_MUT,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log('🚀 ~ Edit Device Error', error);
    },
  });
  return response;
};
