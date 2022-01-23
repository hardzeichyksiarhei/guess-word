import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";

import "../styles/welcome.scss";

const Welcome: React.FC = () => {
  return (
    <div className="welcome-page">
      <h2 className="welcome-page__game-name">Guess Word</h2>
      <img
        className="welcome-page__app-logo"
        src="./img/app-logo.png"
        alt="Guess Word"
      />
      <div className="welcome-page__title">Угадай слово+</div>
      <div className="welcome-page__description">
        Игра угадай слово - это следующая итерация знаменитой игры «Крокодил»,
        где Вам необходимо объяснить слово используя слова начинающиеся с одной
        случайной буквы.
      </div>
      <Row gutter={20}>
        <Col flex="2">
          <Link to="/create">
            <Button className="text-uppercase" type="primary" shape="round" block>
              <b>Создать игру</b>
            </Button>
          </Link>
        </Col>
        <Col flex="1">
          <Link to="/connect">
            <Button className="text-uppercase" type="default" shape="round" block>
              Подключиться к игре
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
