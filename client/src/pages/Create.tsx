import React from "react";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import appState from "../store/appState";

import { IGame } from "../interfaces/gameInterface";

import "../styles/create.scss";

const Create: React.FC = observer(() => {
  const onFinish = (values: Partial<IGame>) => {
    const game = { ...values };
    appState.socket.emit("game:create", game);
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
});

export default Create;
