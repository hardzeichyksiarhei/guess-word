import React from "react";
import { Row, Col, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Rules: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rules-page page">
      <Row justify="space-between" align="middle">
        <Col flex="3">
          <div className="page__title">Правила</div>
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
        <p>
          Игра «Угадай слово» - это следующая итерация знаменитой игры
          «Крокодил», где Вам{" "}
          <strong>
            необходимо объяснить слово используя слова начинающиеся с одной
            случайной буквы
          </strong>
          .
        </p>
        <p>
          <strong>1 игра (матч) это 10 попыток для каждого игрока.</strong>
        </p>
        <p>
          <strong>Время</strong> ответа каждого игрока{" "}
          <strong>подсчитывается</strong> и используется в расчете итогового
          места.
        </p>
        <p>
          Побеждает тот, кто объяснит{" "}
          <strong>большее количество слов за меньшее время</strong>.
        </p>
      </div>
    </div>
  );
};

export default Rules;
