import { ReactNode } from "react";

export enum Fruits {
  Apple,
  Orange,
  Pear,
}

export enum CardType {
  Apple,
  Orange,
  Pear,
  CrowForward,
  CrowBack,
}

export enum Backend {
  Zustand,
  Valtio,
  Jotai,
}

export type Card = {
  id: number;
  type: CardType;
};

export type GameState = {
  discarded: Card[];
  deck: Card[];
  drawn: Card[];
};

export type GameAPI = GameState & {
  startGame: () => void;
  drawCard: () => void;
  bribe: (cardType: CardType) => void;
  endGame: () => void;
};

export type BackendProps = {
  children: (props: GameAPI) => ReactNode;
};
