import { makeAutoObservable } from "mobx";
import { IPlayer } from "../interfaces/playerInterface";

class PlayerState {
  currentPlayer: IPlayer = {
    nickname: "Твоя МаМка ЕпТа",
    avatar: null,
    isOwner: true,
  };
  players: IPlayer[] = [
    {
      nickname: "pupsik",
      avatar: null,
      isOwner: false,
    },
    {
      nickname: "luntik",
      avatar: null,
      isOwner: false,
    },
    {
      nickname: "opasniy",
      avatar: null,
      isOwner: false,
    },
  ];

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
    this.players = players;
  }
}

export default new PlayerState();
