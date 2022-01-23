import React from "react";
import { Button, Form, Input } from "antd";

const Connect: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Как будет называться игра?">
        <Input placeholder="Введите название игры..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Connect;
