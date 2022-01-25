import React from "react";
import { observer } from "mobx-react";
import { Avatar, Button, List } from "antd";
import { StarFilled } from "@ant-design/icons";

import playerState from "../store/playerState";
import { IPlayer } from "../interfaces/playerInterface";
import appState from "../store/appState";

const PlayersList: React.FC = observer(() => {
  const schmoes = [
    "jai",
    "jean",
    "jake",
    "jane",
    "jess",
    "jeri",
    "james",
    "jia",
    "jolle",
    "jack",
    "jude",
    "julie",
  ];

  const handleDeletePlayer = (player: IPlayer) => {
    if (!appState.socket) return;
    appState.socket.emit("game:leave", player);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={playerState.getPlayers}
      renderItem={(player, idx) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                size={46}
                src={player.avatar || `//joeschmoe.io/api/v1/${schmoes[idx]}`}
              />
            }
            title={
              (
                <span>
                  {player.isOwner ? (
                    <StarFilled style={{ color: "orange" }} />
                  ) : player.id === playerState.currentPlayer.id ? (
                    <b>Вы – </b>
                  ) : null}
                  <span>{player.nickname}</span>
                </span>
              ) || "–"
            }
            description={player.isOwner ? <b>Владелец</b> : <span>Игрок</span>}
          />
          {playerState.currentPlayer.isOwner && !player.isOwner ? (
            <Button
              type="dashed"
              size="small"
              onClick={() => handleDeletePlayer(player)}
              danger
            >
              Удалить
            </Button>
          ) : null}
          {player.isReady ? (
            <b style={{ padding: "4px 15px" }}>Готов</b>
          ) : (
            <b style={{ padding: "4px 15px" }}>Не готов</b>
          )}
        </List.Item>
      )}
    />
  );
});

export default PlayersList;
