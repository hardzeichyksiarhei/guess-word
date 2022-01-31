import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import EmptyLayout from "./layouts/EmptyLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Connect from "./pages/Connect";
import Lobby from "./pages/Lobby";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";

import appState from "./store/appState";
import playerState from "./store/playerState";

import { IPlayer } from "./interfaces/playerInterface";
import { IGame } from "./interfaces/gameInterface";
import gameState from "./store/gameState";

const App: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleGameCreated = (game: IGame) => {
    navigate(`/${game.id}`, { state: { isCreated: true } });
    const user = {
      ...playerState.currentPlayer,
      gameId: game.id,
      isOwner: true,
    };
    playerState.setCurrentPlayer(user);
  };

  const handleGameFetched = (game: IGame) => {
    gameState.setGame(game);
  };

  const handleGameUpdated = (game: IGame) => {
    gameState.setGame(game);
  };

  const handleGameSelfJoined = (player: IPlayer) => {
    playerState.setCurrentPlayer(player);
  };

  const handleGamePlayerListed = (players: IPlayer[]) => {
    playerState.setPlayers(players);
  };

  const handleGameLeaved = () => {
    playerState.resetPlayer();
    navigate("/");
  };

  const handleGameNotFound = () => {
    playerState.resetPlayer();
    gameState.resetGame();
    navigate("/");
  };

  const handleDisconnect = () => {};

  useEffect(() => {
    appState.socket.on("game:created", handleGameCreated);
    appState.socket.on("game:updated", handleGameUpdated);
    appState.socket.on("game:geted", handleGameFetched);
    appState.socket.on("game:self:joined", handleGameSelfJoined);
    appState.socket.on("game:player:listed", handleGamePlayerListed);
    appState.socket.on("game:leaved", handleGameLeaved);
    appState.socket.on("game:not-found", handleGameNotFound);
    appState.socket.on("disconnect", handleDisconnect);

    return () => {
      appState.socket.off("game:created", handleGameCreated);
      appState.socket.off("game:updated", handleGameUpdated);
      appState.socket.off("game:geted", handleGameFetched);
      appState.socket.off("game:self:joined", handleGameSelfJoined);
      appState.socket.off("game:player:listed", handleGamePlayerListed);
      appState.socket.off("game:leaved", handleGameLeaved);
      appState.socket.off("game:not-found", handleGameNotFound);
      appState.socket.off("disconnect", handleDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = (
    <>
      <Route path="/" element={<EmptyLayout />}>
        <Route index element={<Welcome />} />
        <Route path="create" element={<Create />} />
        <Route path="connect" element={<Connect />} />
        <Route path="*" element={<Welcome />} />
      </Route>
      <Route path="/:gameId" element={<DefaultLayout />}>
        <Route index element={<Lobby />} />
        <Route path="settings" element={<Settings />} />
        <Route path="rules" element={<Rules />} />
        <Route path="*" element={<Lobby />} />
      </Route>
    </>
  );

  return (
    <div className="app">
      <Routes>{routes}</Routes>
    </div>
  );
});

export default App;
