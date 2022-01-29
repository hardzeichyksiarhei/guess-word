import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "antd";

import appState from "../store/appState";
import gameState from "../store/gameState";

import { IGame } from "../interfaces/gameInterface";
import GameList from "../components/GameList";
import { observer } from "mobx-react-lite";

const Connect: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleFetchGameList = (games: IGame[]) => {
    gameState.setGames(games);
  };

  useEffect(() => {
    appState.socket.on("game:listed", handleFetchGameList);
    appState.socket.emit("game:list");

    return () => {
      appState.socket.off("game:listed", handleFetchGameList);
      gameState.setGames([]);
    };
  }, []);

  return (
    <div className="connect-page page">
      <Row justify="space-between" align="middle">
        <Col flex="3">
          <div className="page__title">Игры</div>
        </Col>
        <Col flex="1">
          <Button
            className="text-uppercase"
            type="primary"
            shape="round"
            onClick={() => navigate(-1)}
            block
          >
            Назад
          </Button>
        </Col>
      </Row>
      <div className="page__content">
        <Row>
          <Col flex="1">
            <GameList />
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default Connect;
