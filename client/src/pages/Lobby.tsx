import React from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

import Toolbar from "../components/Toolbar";
import EditPlayer from "../components/EditPlayer";
import PlayersList from "../components/PlayersList";

import appState from "../store/appState";
import playerState from "../store/playerState";

import { IPlayer } from "../interfaces/playerInterface";

const Lobby: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleToggleReady = () => {
    const { isReady, ...player } = playerState.currentPlayer;
    const user: IPlayer = { ...player, isReady: !isReady };
    appState.socket.emit("game:player:edit", user);
  };

  if (!playerState.currentPlayer.gameId) return null;

  return (
    <div className="lobby-page page">
      <Toolbar
        className="page__toolbar"
        title="Раздевалка"
        description="Настройка игрока"
      />

      <div className="page__content">
        <Row gutter={30}>
          <Col span={14}>
            <h4>Вы</h4>
            <EditPlayer />
          </Col>
          <Col span={10}>
            <h4>Игроки</h4>
            <PlayersList />
          </Col>
        </Row>
      </div>
      <div className="page__footer">
        <Row gutter={20}>
          <Col flex={1}>
            <Button
              className="mt-2 text-uppercase"
              type="primary"
              shape="round"
              onClick={handleToggleReady}
              block
              danger={playerState.currentPlayer.isReady}
            >
              {playerState.currentPlayer.isReady ? "Не готов" : "Готов"}
            </Button>
          </Col>
          {playerState.currentPlayer.isOwner ? (
            <Col flex={1}>
              <Button
                className="mt-2 text-uppercase"
                type="primary"
                shape="round"
                block
                disabled={
                  !playerState.isAllPlayersReady ||
                  playerState.players.length < 2
                }
                onClick={() => navigate("settings")}
              >
                Далее
              </Button>
            </Col>
          ) : null}
        </Row>
      </div>
    </div>
  );
});

export default Lobby;
