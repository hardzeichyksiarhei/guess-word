import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Row, Col, Button } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";

import gameState from "../store/gameState";
import EditPlayer from "../components/EditPlayer";
import PlayersList from "../components/PlayersList";

import appState from "../store/appState";
import playerState from "../store/playerState";

import { IPlayer } from "../interfaces/playerInterface";

interface LocationState {
  isCreated: boolean;
}

const Lobby: React.FC = observer(() => {
  const params = useParams();
  const location = useLocation();

  const { isCreated } = (location.state || {}) as LocationState;

  useEffect(() => {
    if (!params.gameId) return;
    if (!appState.socket) return;

    const gameId = params.gameId;
    const player = { ...playerState.currentPlayer, gameId };
    if (isCreated) player.isOwner = true;

    appState.socket.emit("game:player:list", gameId);
    appState.socket.emit("game:join", player);
    playerState.setCurrentPlayer(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.gameId, appState.socket]);

  const handleToggleReady = () => {
    if (!appState.socket) return;

    const { isReady, ...player } = playerState.currentPlayer;
    const user: IPlayer = { ...player, isReady: !isReady };
    appState.socket.emit("game:player:edit", user);
  };

  const handleClickExit = () => {
    if (!appState.socket) return;
    appState.socket.emit("game:leave", playerState.currentPlayer);
  };

  if (!playerState.currentPlayer.gameId) return null;

  return (
    <div className="lobby-page page">
      <Row justify="space-between" align="middle">
        <Col flex="2">
          <div className="page__title">Раздевалка</div>
        </Col>
        <Col flex="1">
          <Row gutter={20}>
            <Col flex="2">
              <Link to={`/${gameState.gameId}/rules`}>
                <Button
                  className="text-uppercase"
                  type="primary"
                  shape="round"
                  block
                >
                  Правила
                </Button>
              </Link>
            </Col>
            <Col flex="1">
              <Button
                className="text-uppercase"
                type="primary"
                shape="round"
                onClick={handleClickExit}
                block
                danger
              >
                Выйти
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="page__description">Настройка игрока</div>
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
      </div>
    </div>
  );
});

export default Lobby;
