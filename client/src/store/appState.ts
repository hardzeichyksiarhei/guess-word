import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";

class AppState {
  socket: Socket | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket: Socket) {
    this.socket = socket;
  }
}

export default new AppState();
