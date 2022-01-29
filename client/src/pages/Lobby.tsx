import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "antd";
import { useParams, useLocation } from "react-router-dom";

import Toolbar from "../components/Toolbar";
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

    const gameId = params.gameId;
    const player = { ...playerState.currentPlayer, gameId };
    if (isCreated) player.isOwner = true;

    appState.socket.emit("game:player:list", gameId);
    appState.socket.emit("game:join", player);
    playerState.setCurrentPlayer(player);
  }, [params.gameId, isCreated]);

  const handleToggleReady = () => {
    const { isReady, ...player } = playerState.currentPlayer;
    const user: IPlayer = { ...player, isReady: !isReady };
    appState.socket.emit("game:player:edit", user);
  };

  if (!playerState.currentPlayer.gameId) return null;

  return (
    <div className="lobby-page page">
      <Toolbar className="page__toolbar" title="Раздевалка" description="Настройка игрока" />

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
