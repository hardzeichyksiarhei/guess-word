import React from "react";
import { Form, Input } from "antd";
import playerState from "../store/playerState";
import { observer } from "mobx-react";

import { IPlayer } from "../interfaces/playerInterface";

const EditPlayer: React.FC = observer(() => {
  const onValuesChange = (changedValues: Partial<IPlayer>) => {
    playerState.updateCurrentPlayer(changedValues);
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ nickname: playerState.currentPlayer.nickname }}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="Псевдоним"
        name="nickname"
        rules={[{ required: true, message: "Please input your nickname!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default EditPlayer;
