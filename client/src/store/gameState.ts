import { makeAutoObservable } from "mobx";

import { ICategory } from "../interfaces/categoryInterface";
import { IGame } from "../interfaces/gameInterface";
import appState from "./appState";

export const defaultGame = (): IGame => ({
  id: null,
  name: "",
  settings: {
    categories: [],
  },
});

class GameState {
  game: IGame = defaultGame();
  games: IGame[] = [];

  constructor() {
    makeAutoObservable(this);

    const game = localStorage.getItem("game");
    if (game) {
      this.game = JSON.parse(game);
    }
  }

  setGames(games: IGame[]) {
    this.games = games;
  }

  setGame(game: IGame) {
    this.game = game;

    localStorage.setItem("game", JSON.stringify(game));
  }

  toggleGameCategory(category: ICategory) {
    const isSelected = this.checkSelectedCategory(category);
    const categories = isSelected
      ? this.game.settings.categories.filter((id) => id !== category.id)
      : [...this.game.settings.categories, category.id];
    const game = {
      ...this.game,
      settings: { ...this.game.settings, categories },
    };
    appState.socket.emit("game:update", game);
  }

  checkSelectedCategory(category: ICategory) {
    const { id } = category;
    return this.game.settings.categories.indexOf(id) !== -1;
  }

  resetGame() {
    this.setGame(defaultGame());
    this.setGames([]);
    localStorage.removeItem("game");
  }
}

export default new GameState();
