import React, { useEffect } from "react";
import { Form, Input } from "antd";
import playerState from "../store/playerState";
import { observer } from "mobx-react";

import { IPlayer } from "../interfaces/playerInterface";

const EditPlayer: React.FC = observer(() => {
  const [form] = Form.useForm();
  const onValuesChange = (changedValues: Partial<IPlayer>) => {
    playerState.updateCurrentPlayer(changedValues);
  };

  useEffect(() => {
    form.setFieldsValue({
      nickname: playerState.currentPlayer.nickname,
    });
  }, [playerState.currentPlayer]);

  return (
    <Form
      form={form}
      layout="vertical"
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
