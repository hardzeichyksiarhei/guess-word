import { makeAutoObservable } from "mobx";

class GameState {
  gameId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }
}

export default new GameState();
