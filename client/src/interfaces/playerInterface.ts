export interface IPlayer {
  id?: string;
  gameId: string | null;
  sessionId: string | null;
  nickname: string;
  avatar: string | null;
  isOwner: boolean;
  isReady: boolean;
}
