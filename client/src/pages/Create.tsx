import React from "react";
import { Button, Form, Input } from "antd";

import "../styles/create.scss";
import appState from "../store/appState";


const Create: React.FC = () => {
  const onFinish = (values: any) => {
    if (!appState.socket) return;

    console.log("Success:", values);
    appState.socket.emit("game:create", values);
  };

  return (
    <Form className="create-form" layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Как будет называться игра?">
        <Input placeholder="Введите название игры..." />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Create;
