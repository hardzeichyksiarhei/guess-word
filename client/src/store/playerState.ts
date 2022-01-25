import { makeAutoObservable } from "mobx";
import { IPlayer } from "../interfaces/playerInterface";

export const defaultCurrentPlayer = () => ({
  gameId: null,
  sessionId: null,
  nickname: String(new Date().getTime()),
  avatar: null,
  isOwner: false,
  isReady: false,
});

class PlayerState {
  currentPlayer: IPlayer = defaultCurrentPlayer();
  players: IPlayer[] = [];

  constructor() {
    makeAutoObservable(this);

    const currentPlayer = localStorage.getItem("currentPlayer");
    if (currentPlayer) {
      this.currentPlayer = JSON.parse(currentPlayer);
    }
  }

  get getPlayers() {
    const ownerPlayer = this.players.find((player) => player.isOwner === true);

    if (!ownerPlayer) return this.players;

    const otherPlayers = this.players.filter(
      (player) => player.id !== ownerPlayer.id
    );
    return [ownerPlayer, ...otherPlayers];
  }

  setCurrentPlayer(currentPlayer: IPlayer) {
    this.currentPlayer = currentPlayer;

    localStorage.setItem("currentPlayer", JSON.stringify(this.currentPlayer));
  }

  updateCurrentPlayer(payload: Partial<IPlayer>) {
    this.currentPlayer = { ...this.currentPlayer, ...payload };

    localStorage.setItem("currentPlayer", JSON.stringify(this.currentPlayer));
  }

  setPlayers(players: IPlayer[]) {
    const currentPlayerFromStorage = localStorage.getItem("currentPlayer");
    if (currentPlayerFromStorage) {
      const { id } = JSON.parse(currentPlayerFromStorage);
      const currentPlayer = players.find((player) => player.id === id);
      if (currentPlayer) this.setCurrentPlayer(currentPlayer);
    }

    this.players = players;
  }

  resetPlayer() {
    this.setCurrentPlayer(defaultCurrentPlayer());
    localStorage.removeItem("currentPlayer");
  }
}

export default new PlayerState();
