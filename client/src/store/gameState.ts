import { makeAutoObservable } from "mobx";

import { IGame } from "../interfaces/gameInterface";

class GameState {
  gameId: string | null = null;
  games: IGame[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }

  setGames(games: IGame[]) {
    this.games = games;
  }
}

export default new GameState();
