import React, { useEffect } from "react";
import { Col, Row } from "antd";

import appState from "../store/appState";
import gameState from "../store/gameState";

import { IGame } from "../interfaces/gameInterface";
import GameList from "../components/GameList";

const Connect: React.FC = () => {
  useEffect(() => {
    if (!appState.socket) return;

    appState.socket.emit("game:list").on("game:listed", (games: IGame[]) => {
      console.log(games);
      gameState.setGames(games);
    });
    return () => {
      gameState.setGames([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.socket]);

  return (
    <div className="lobby-page page">
      <Row justify="space-between" align="middle">
        <Col flex="2">
          <div className="page__title">Игры</div>
          <div className="page__content">
            <Row>
              <Col flex="1">
                <GameList />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Connect;
