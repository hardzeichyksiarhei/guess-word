import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
      <Link to="/settings">
        <Button type="primary" shape="round" block>
          Ок, погнали
        </Button>
      </Link>
    </div>
  );
};

export default Welcome;
