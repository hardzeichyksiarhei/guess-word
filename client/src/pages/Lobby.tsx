import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

import gameState from "../store/gameState";
import EditPlayer from "../components/EditPlayer";
import PlayersList from "../components/PlayersList";

const Lobby: React.FC = () => {
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
            <EditPlayer  />
          </Col>
          <Col span={10}>
            <h4>Игроки</h4>
            <PlayersList />
          </Col>
        </Row>
      </div>
      <div className="page__footer">
        <Link to="/categories">
          <Button
            className="mt-2 text-uppercase"
            type="primary"
            shape="round"
            block
          >
            Далее
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Lobby;
