import { observer } from "mobx-react";
import React from "react";
import { Avatar, Button, List } from "antd";
import { blue } from "@ant-design/colors";

import playerState from "../store/playerState";

const PlayersList: React.FC = observer(() => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={playerState.getPlayers}
      renderItem={(player) => (
        <List.Item style={{ backgroundColor: player.isOwner ? blue[0] : "" }}>
          <List.Item.Meta
            avatar={
              <Avatar
                size={46}
                src={player.avatar || "https://joeschmoe.io/api/v1/random"}
              />
            }
            title={player.nickname || "–"}
            description={player.isOwner ? <b>Владелец</b> : "Игрок"}
          />
          {!player.isOwner ? (
            <Button type="link" danger>
              Удалить
            </Button>
          ) : null}
        </List.Item>
      )}
    />
  );
});

export default PlayersList;
