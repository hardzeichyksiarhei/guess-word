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

import appState from "./store/appState";
import playerState from "./store/playerState";

import { IPlayer } from "./interfaces/playerInterface";

const App: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    appState.socket.on("game:created", (gameId: string) => {
      navigate(`/${gameId}`, { state: { isCreated: true } });
      const user = { ...playerState.currentPlayer, gameId, isOwner: true };
      playerState.setCurrentPlayer(user);
    });

    appState.socket.on("game:joined", (player: IPlayer) => {
      playerState.setPlayers([...playerState.players, player]);
    });

    appState.socket.on("game:self:joined", (player: IPlayer) => {
      playerState.setCurrentPlayer(player);
    });

    appState.socket.on("game:player:listed", (players: IPlayer[]) => {
      playerState.setPlayers(players);
    });

    appState.socket.on("game:leaved", () => {
      playerState.resetPlayer();
      navigate("/");
    });

    appState.socket.on("disconnect", () => {});
  }, [navigate]);

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
