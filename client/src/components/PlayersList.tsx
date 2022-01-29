import React from "react";
import { observer } from "mobx-react-lite";
import { Avatar, Button, List } from "antd";
import { BulbFilled, StarFilled, DeleteFilled } from "@ant-design/icons";

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
          <BulbFilled
            style={{
              marginRight: 5,
              fontSize: 16,
              color: player.isReady ? "orange" : "lightgray",
            }}
          />
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
                    <StarFilled style={{ marginRight: 5, color: "orange" }} />
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
              type="primary"
              size="small"
              onClick={() => handleDeletePlayer(player)}
              danger
            >
              <DeleteFilled />
            </Button>
          ) : null}
        </List.Item>
      )}
    />
  );
});

export default PlayersList;
