import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { observer } from "mobx-react";

import EmptyLayout from "./layouts/EmptyLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Connect from "./pages/Connect";
import Profile from "./pages/Profile";

import gameState from "./store/gameState";
import appState from "./store/appState";

const SERVER_URL = "http://localhost:5000";

const App: React.FC = observer(() => {
  useEffect(() => {
    const socket = io(`${SERVER_URL}/game`);
    appState.setSocket(socket);

    socket.on("game:created", (payload: string) => {
      gameState.setGameId(payload);
    });
  }, []);

  const publicRoutes = (
    <Route path="/" element={<EmptyLayout />}>
      <Route index element={<Welcome />} />
      <Route path="create" element={<Create />} />
      <Route path="connect" element={<Connect />} />
    </Route>
  );

  const privateRoutes = (
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Profile />} />
    </Route>
  );

  return (
    <div className="app">
      <Routes>
        {publicRoutes}
        {privateRoutes}
      </Routes>
    </div>
  );
});

export default App;
