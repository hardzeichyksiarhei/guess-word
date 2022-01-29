import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";

import { SERVER_API_URL } from "../config";

class AppState {
  socket: Socket;

  constructor() {
    makeAutoObservable(this);

    this.socket = io(`${SERVER_API_URL}/game`, { transports: ["websocket"] });
  }
}

export default new AppState();
