import React, { useState, useEffect } from 'react';
import { Row, Col, InputNumber, Button, Form, Input, Select } from 'antd';

import axios from 'axios';

import { withRouter, Link } from 'react-router-dom';

import Layout from '@Components/Layout';
import { API_BASE_URL } from '@Constants/config';

import { useEditDeviceMutation, useGetDevice } from '@RcQuery/devicesHooks';
import { useEditEmployeeMutation } from '@RcQuery/employeesHooks';
import { useGetEmployee } from '@RcQuery/employeesHooks';
import { queryClient } from '@RcQuery';

const { Option } = Select;

const EditEmployee = ({ match, history }) => {
  const editDeveiceMutation = useEditDeviceMutation();
  // const { status, data, error, isFetching } = useGetDevice(match.params.id);

  const editEmployeeMutation = useEditEmployeeMutation();

  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  useEffect(async () => {
    await axios.get(`${API_BASE_URL}/api/v1/employees/${match.params.id}`).then((response) => {
      // setDeviceName(response.data?.system_name);
      // setCapacity(response.data?.hdd_capacity);
      // setType(response.data?.type);

      console.log('response', response?.data?.firstName);

      form.setFieldsValue({
        firstName: response?.data?.firstName,
        lastName: response?.data?.lastName,
        emailId: response?.data?.emailId,
      });
    });
  }, []);

  const onFinish = (values) => {
    editEmployeeMutation
      .mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: values.emailId,
        id: match.params.id,
      })
      .then((data) => {
        queryClient.refetchQueries(['allEmployees']);
        history.push('/dashboard');
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout style={{ height: '90vh' }}>
      <h1 className="page-title">Edit/View Employee</h1>
      <Row style={{ width: '100%' }} gutter={[16, 16]}>
        <Col span={24}>
          <Link to="/dashboard">&#8592; Back To Dashboard</Link>
        </Col>
        <Col span={24}></Col>
        <Col span={12}>
          <Form class="device-form" form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              value={firstName}
              name="firstName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Last Name"
              value={lastName}
              name="lastName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setLastName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Email Id"
              value={emailId}
              name="emailId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setEmailId(e.target.value)} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                {editDeveiceMutation.isLoading ? 'Editing Employee...' : 'Edit Employee'}
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default withRouter(EditEmployee);
