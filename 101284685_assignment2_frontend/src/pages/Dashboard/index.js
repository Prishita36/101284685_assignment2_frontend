import React, { useState } from 'react';
import { Row, Col, Modal, Button, Form, Input, Select, InputNumber } from 'antd';

import { withRouter } from 'react-router-dom';

// import StatisticsCard from '../../components/StatisticsCard';
import DashboardTable from '../../components/DashboardTable';

import Layout from '@Components/Layout';

import { useAddDeviceMutation } from '@RcQuery/devicesHooks';

import { useAddEmployeeMutation } from '@RcQuery/employeesHooks';

import { queryClient } from '@RcQuery';

const { Option } = Select;

const AddDevice = ({ history }) => {
  const [visibleModel, setVisibleModel] = React.useState(false);

  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  const addDeveiceMutation = useAddDeviceMutation();

  const addAddEmployeeMutation = useAddEmployeeMutation();

  const onFinish = (values) => {
    addAddEmployeeMutation
      .mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: values.emailId,
      })
      .then((data) => {
        setVisibleModel(false);
        queryClient.refetchQueries(['allEmployees']);
        form.resetFields();
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setVisibleModel(true);
  };

  const handleCancel = () => {
    setVisibleModel(false);
  };

  return (
    <Layout>
      <h1 className="page-title">Employees</h1>
      <Row style={{ width: '100%' }} gutter={[16, 16]}>
        <Col span={20}></Col>
        <Col span={4}>
          {/* <button className="add-btn">Add Device</button> */}
          <Button type="primary" onClick={showModal}>
            Add Employee
          </Button>
        </Col>

        <Modal
          title="Title"
          okText="Submit"
          onCancel={handleCancel}
          cancelText="Reset"
          visible={visibleModel}
          footer={null}
        >
          <Form class="device-form" form={form} onFinish={onFinish} name="control-hooks">
            <Form.Item
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="emailId"
              label="Email Id"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                {addAddEmployeeMutation.isLoading ? 'Adding Employee...' : 'Add Employee'}
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Col span={24}>
          <DashboardTable />
        </Col>
      </Row>
    </Layout>
  );
};

export default withRouter(AddDevice);
