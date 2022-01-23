import React from "react";
import { Button, Form, Input } from "antd";

import "../styles/create.scss";

const Create: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form className="create-form" layout="vertical" onFinish={onFinish}>
      <Form.Item label="Как будет называться игра?">
        <Input placeholder="Введите название игры..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Создать</Button>
      </Form.Item>
    </Form>
  );
};

export default Create;
