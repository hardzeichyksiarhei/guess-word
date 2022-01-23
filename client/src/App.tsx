import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { observer } from "mobx-react";

import EmptyLayout from "./layouts/EmptyLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Connect from "./pages/Connect";
import Lobby from "./pages/Lobby";
import Rules from "./pages/Rules";

import gameState from "./store/gameState";
import appState from "./store/appState";

const SERVER_URL = "http://localhost:5000";

const App: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(`${SERVER_URL}/game`);
    appState.setSocket(socket);

    socket.on("game:created", (payload: string) => {
      navigate(`/${payload}/lobby`);
      gameState.setGameId(payload);
    });
  }, []);

  const publicRoutes = (
    <Route path="/" element={<EmptyLayout />}>
      <Route index element={<Welcome />} />
      <Route path="create" element={<Create />} />
      <Route path="connect" element={<Connect />} />
      <Route path="*" element={<Welcome />} />
    </Route>
  );

  const privateRoutes = (
    <Route path="/:gameId" element={<DefaultLayout />}>
      <Route index element={<Lobby />} />
      <Route path="rules" element={<Rules />} />
      <Route path="*" element={<Lobby />} />
    </Route>
  );

  const routes = !gameState.gameId ? publicRoutes : privateRoutes;

  return (
    <div className="app">
      <Routes>{routes}</Routes>
    </div>
  );
});

export default App;
