
import React from 'react';
import { Button, Form, Input, notification } from 'antd';

const CreateForm: React.FC<{ refreshData: () => void }> = ({ refreshData }) => {
  const [form] = Form.useForm();

  const submit = async () => {
    const values = form.getFieldsValue();
    if (!values.title || !values.description || !values.persona || !values.group) {
      notification.error({
        message: 'Error',
        description: 'All fields are necessary',
      });
    } else {
      try {
        const response = await fetch("/api/task", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          notification.success({
            message: 'Success',
            description: 'Task created successfully',
          });
          reset();
          refreshData();
        } else {
          notification.error({
            message: 'Error',
            description: 'Task creation failed',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'An error occurred',
        });
      }
    }
  };

  const reset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        name="validateOnly"
        layout={"vertical"}
        form={form}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]} required tooltip="This is a required field">
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]} required tooltip="This is a required field">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item name="persona" label="Persona" rules={[{ required: true }]} required tooltip="This is a required field">
          <Input placeholder="Enter persona" />
        </Form.Item>
        <Form.Item name="group" label="Group" rules={[{ required: true }]} required tooltip="This is a required field">
          <Input type="number" placeholder="Enter group no." />
        </Form.Item>
        <Form.Item>
          <div className='flex gap-5 justify-center mt-1'>
            <Button type="primary" onClick={submit}>Submit</Button>
            <Button htmlType="reset" onClick={reset} style={{
              backgroundColor: "red",
              color: "white",
            }}>Reset</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
