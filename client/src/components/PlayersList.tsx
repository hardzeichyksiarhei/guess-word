import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Avatar, Button, List } from "antd";
import { blue } from "@ant-design/colors";

import playerState from "../store/playerState";
import appState from "../store/appState";
import gameState from "../store/gameState";

const PlayersList: React.FC = observer(() => {
  useEffect(() => {
    if (!appState.socket) return;

    appState.socket.emit("game:player:list", { gameId: gameState.gameId });
  }, [appState.socket]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={playerState.getPlayers}
      renderItem={(player, idx) => (
        <List.Item style={{ backgroundColor: idx === 0 ? blue[0] : "" }}>
          <List.Item.Meta
            avatar={
              <Avatar
                size={46}
                src={player.avatar || "https://joeschmoe.io/api/v1/random"}
              />
            }
            title={player.nickname || "–"}
            description={player.isOwner ? <b>Владелец</b> : <span>Игрок</span>}
          />
          {playerState.currentPlayer.isOwner && !player.isOwner ? (
            <Button type="dashed" size="small" danger>
              Удалить
            </Button>
          ) : null}
          {playerState.currentPlayer.id === player.id ? (
            <b style={{ padding: "4px 15px" }}>Вы</b>
          ) : null}
        </List.Item>
      )}
    />
  );
});

export default PlayersList;
