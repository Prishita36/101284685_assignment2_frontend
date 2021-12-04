import { useQuery, useMutation } from 'react-query';

import { GET_ALL_EMPLOYEES, GET_EMPLOYEE, ADD_EMLOYEE_MUT, DELETE_EMPLOYEE_MUT, EDIT_EMPLOYEE_MUT } from './keys';
import employeesApi from '@Services/employees';

export const useGetAllEmployees = (body) => {
  const employees = useQuery([GET_ALL_EMPLOYEES], () => employeesApi.getEmployees());

  return employees;
};

export const useGetEmployee = (id) => {
  const employee = useQuery([GET_EMPLOYEE, id], () => employeesApi.getEmployee(id));

  return employee;
};

export const useAddEmployeeMutation = (history) => {
  const response = useMutation(employeesApi.addEmployee, {
    mutationKey: ADD_EMLOYEE_MUT,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log('🚀 ~ Add Employee Error', error);
    },
  });
  return response;
};

export const useDeleteEmployeeMutation = (history) => {
  const response = useMutation(employeesApi.deleteEmployee, {
    mutationKey: DELETE_EMPLOYEE_MUT,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log('🚀 ~ Delete Employee Error', error);
    },
  });
  return response;
};

export const useEditEmployeeMutation = () => {
  const response = useMutation(employeesApi.editEmployee, {
    mutationKey: EDIT_EMPLOYEE_MUT,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log('🚀 ~ Edit Employee Error', error);
    },
  });
  return response;
};
