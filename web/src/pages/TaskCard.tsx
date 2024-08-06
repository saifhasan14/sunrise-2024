import React, { useState } from 'react';
import { Card, Button, Divider, Form, Input, Tooltip, message } from 'antd';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import Task from '../model/Task';

const TaskCard: React.FC<{ task: Task, id: number, title: string, description: string, persona: string, group: number, completed: boolean, boolValue: boolean, onUpdate: () => void, onDelete: () => void }> = ({ task, id, title, description, persona, group, completed, boolValue, onUpdate, onDelete }) => {
  const [startUpdate, setStartUpdate] = useState<boolean>(false);
  const [form] = Form.useForm();

  const updateClick = () => {
    setStartUpdate(true);
    form.setFieldsValue({ title, description, persona, group });
  };

  const submit = async () => {
    try {
      const values = form.getFieldsValue();
      values.id = id;

      if (!values.title || !values.description || !values.persona || !values.group) {
        message.error("All fields are necessary");
        return;
      }

      const response = await fetch("/api/task", {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      if (data.success) {
        message.success("Task updated successfully");
        reset();
        onUpdate();
      } else {
        message.error("Task update failed");
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  const reset = () => {
    setStartUpdate(false);
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`/api/task?id=${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      if (data.success) {
        message.success("Task deleted successfully");
        onDelete();
      } else {
        message.error("Task deletion failed");
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  const completeTask = async () => {
    try {
      const response = await fetch("/api/complete", {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      if (data.success) {
        message.success("Task completed successfully");
        onUpdate();
      } else {
        message.error("Task completion failed");
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <Card
      title={<div className="flex justify-between items-center"><span>Task {id}</span>{!completed && <Button icon={<CheckOutlined />} onClick={completeTask} disabled={!boolValue} />}</div>}
      bordered={false}
      style={{ width: "100%", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "16px" }}
      bodyStyle={{ padding: "16px" }}
    >
      <div>
        {startUpdate ? (
          <Form
            layout="vertical"
            form={form}
            initialValues={{ title, description, persona, group }}
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input placeholder="Enter description" />
            </Form.Item>
            <Form.Item name="persona" label="Persona" rules={[{ required: true }]}>
              <Input placeholder="Enter persona" />
            </Form.Item>
            <Form.Item name="group" label="Group" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter group no." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={submit} style={{ marginRight: "8px" }}>Submit</Button>
              <Button onClick={reset} style={{ backgroundColor: "red", color: "white" }}>Cancel</Button>
            </Form.Item>
          </Form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3 className="font-semibold text-lg">{title}</h3>
            <Divider />
            <p>{description}</p>
            <div className="flex gap-2 justify-center my-3">
              <Tooltip title="Delete Task">
                <Button 
                  icon={<CloseOutlined />} 
                  onClick={deleteTask} 
                  style={{ 
                    backgroundColor: "red", 
                    color: "white",
                    minWidth: '80px',
                    fontSize: '12px',
                  }}
                >delete</Button>
              </Tooltip>
              <Tooltip title="Edit Task">
                <Button 
                  icon={<EditOutlined />} 
                  onClick={updateClick} 
                  style={{ 
                    backgroundColor: "orange", 
                    color: "white",
                    minWidth: '80px',
                    fontSize: '12px',
                  }}
                >edit</Button>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
