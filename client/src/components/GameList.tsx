import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, List } from "antd";

import gameState from "../store/gameState";

const GameList: React.FC = observer(() => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={gameState.games}
      renderItem={(game, idx) => (
        <List.Item>
          <List.Item.Meta
            title={game.name || "Без названия"}
            description={`#${game.id}`}
          />
          <Link to={`/${game.id}`}>
            <Button type="primary">Войти</Button>
          </Link>
        </List.Item>
      )}
    />
  );
});

export default GameList;
