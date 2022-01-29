import React from "react";
import { Button } from "antd";

import appState from "../store/appState";
import playerState from "../store/playerState";

const ExitButton = () => {
  const handleGameLeave = () => {
    if (!appState.socket) return;
    appState.socket.emit("game:leave", playerState.currentPlayer);
  };

  const handleGameOwnerLeave = () => {
    if (!appState.socket) return;
    appState.socket.emit("game:owner-leave", playerState.currentPlayer);
  };

  return (
    <Button
      className="text-uppercase"
      type="primary"
      shape="round"
      onClick={
        !playerState.currentPlayer.isOwner
          ? handleGameLeave
          : handleGameOwnerLeave
      }
      block
      danger
    >
      {!playerState.currentPlayer.isOwner ? 'Выйти' : 'Завершить игру'}
    </Button>
  );
};

export default ExitButton;
