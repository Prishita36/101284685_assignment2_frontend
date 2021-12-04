import React, {useEffect} from 'react';

import { Link, withRouter } from 'react-router-dom';

import { Table, Space, Alert } from 'antd';

import {useGetAllEmployees, useDeleteEmployeeMutation} from '@RcQuery/employeesHooks';

import { queryClient } from '@RcQuery';


const DataTable = (props) => {


  const deleteEmployee = useDeleteEmployeeMutation()

  const employees = useGetAllEmployees();

  const detleteSingleEmployee = (id) => {
    deleteEmployee.mutateAsync(id).then((data) => {

      queryClient.refetchQueries(['allEmployees']);

    });
  }




  const columns = [
    {
      title: 'Emloyee First Name',
      dataIndex: 'firstName',
      key: 'firstName',

    },
    {
      title: 'Emloyee Last Name',
      dataIndex: 'lastName',
      key: 'lastName',


    },
    {
      title: 'Emloyee Email Id',
      dataIndex: 'emailId',
      key: 'emailId',

    },

    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/employee/${text}`}>Edit</Link>
          <Link to={`/employee/${text}`}>View</Link>
          <a onClick={() => detleteSingleEmployee(text)} >Delete</a>
        </Space>
      ),
    },


  ];



  return (
    <div>
      {deleteEmployee.isSuccess ? (
            <Alert closable  message="Device Delete Successfully" type="success" />
          ) : deleteEmployee.isError ? (
            <Alert closable  message="Device Delete Error" type="error" />
          ) : null}
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        pagination={{ position: ['none', 'bottomRight'], pageSize: 8 }}
        dataSource={employees?.data}
        pagination={false}
      />
    </div>
  );
};

export default withRouter(DataTable);
