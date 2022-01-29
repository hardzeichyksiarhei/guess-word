import React from "react";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import appState from "../store/appState";

import { IPlayer } from "../interfaces/playerInterface";
import playerState from "../store/playerState";

const EditPlayer: React.FC = observer(() => {
  const onFinish = (values: Partial<IPlayer>) => {
    if (!appState.socket) return;
    const { id } = playerState.currentPlayer;
    appState.socket.emit("game:player:edit", { id, ...values });
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        id: playerState.currentPlayer.id,
        nickname: playerState.currentPlayer.nickname,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Псевдоним"
        name="nickname"
        rules={[{ required: true, message: "Please input your nickname!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          className="text-uppercase"
          htmlType="submit"
          type="primary"
          shape="round"
        >
          <b>Сохранить</b>
        </Button>
      </Form.Item>
    </Form>
  );
});

export default EditPlayer;
