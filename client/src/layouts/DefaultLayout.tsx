import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useLocation, useParams } from "react-router-dom";

import playerState from "../store/playerState";
import appState from "../store/appState";

const { Content } = Layout;

const DefaultLayout: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  
  useEffect(() => {
    if (!params.gameId) return;

    const { isCreated } = (location.state || {}) as Record<string, any>;

    const gameId = params.gameId;
    const player = { ...playerState.currentPlayer, gameId };
    if (isCreated) player.isOwner = true;

    appState.socket.emit("game:player:list", gameId);
    appState.socket.emit("game:join", player);

    playerState.setCurrentPlayer(player);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.gameId]);

  return (
    <Layout className="default-layout">
      <Content className="default-layout-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
