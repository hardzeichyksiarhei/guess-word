import { makeAutoObservable } from "mobx";
import { IPlayer } from "../interfaces/playerInterface";

class PlayerState {
  currentPlayer: IPlayer = {
    nickname: "Твоя МаМка ЕпТа",
    avatar: null,
    isOwner: false,
  };
  players: IPlayer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get getPlayers() {
    return [this.currentPlayer, ...this.players];
  }

  setCurrentPlayer(currentPlayer: IPlayer) {
    this.currentPlayer = currentPlayer;
  }

  updateCurrentPlayer(payload: Partial<IPlayer>) {
    this.currentPlayer = { ...this.currentPlayer, ...payload };
  }

  setPlayers(players: IPlayer[]) {
    const currentPlayerId = JSON.parse(
      localStorage.getItem("currentPlayerId") || ""
    );

    const currentPlayer = players.find(
      (player) => player.id === currentPlayerId
    );
    if (currentPlayer) this.currentPlayer = currentPlayer;
    this.players = players.filter((player) => player.id !== currentPlayerId);
  }
}

export default new PlayerState();
