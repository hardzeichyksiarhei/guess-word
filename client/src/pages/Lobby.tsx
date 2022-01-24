import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { Link, useParams } from "react-router-dom";

import gameState from "../store/gameState";
import EditPlayer from "../components/EditPlayer";
import PlayersList from "../components/PlayersList";

import appState from "../store/appState";
import playerState from "../store/playerState";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { observer } from "mobx-react";

const Lobby: React.FC = observer(() => {
  const params = useParams();
  const [gameId, setGameId] = useLocalStorage('gameId')

  useEffect(() => {
    if (!params.gameId) return;

    gameState.setGameId(params.gameId);
    setGameId(params.gameId)

  }, [params.gameId]);

  const handleClickNextStep = () => {
    if (!appState.socket) return;

    appState.socket.emit("game:join", {
      ...playerState.currentPlayer,
      gameId: gameState.gameId,
    });
  };

  if (!gameState.gameId) return null;

  return (
    <div className="lobby-page page">
      <Row justify="space-between" align="middle">
        <Col flex="3">
          <div className="page__title">Раздевалка</div>
        </Col>
        <Col flex="1">
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
      </Row>

      <div className="page__description">Настройка игорока</div>
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
          disabled={!!playerState.currentPlayer.id}
          onClick={handleClickNextStep}
          block
        >
          Далее
        </Button>
      </div>
    </div>
  );
});

export default Lobby;
