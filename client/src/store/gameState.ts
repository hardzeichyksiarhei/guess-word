import { makeAutoObservable } from "mobx";

import { IGame } from "../interfaces/gameInterface";

class GameState {
  games: IGame[] = [];
  game: IGame | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setGames(games: IGame[]) {
    this.games = games;
  }

  setGame(game: IGame | null) {
    this.game = game;
  }
}

export default new GameState();
