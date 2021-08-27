import { CardType } from "../types";
import shuffle from "./shuffle";

const FRUIT_COUNT = 8;
const CROW_COUNT = 9;

const createDeck = () => {
  let cursor = 0;
  return shuffle([
    ...[...Array(FRUIT_COUNT)].map(() => ({
      id: cursor++,
      type: CardType.Apple,
    })),
    ...[...Array(FRUIT_COUNT)].map(() => ({
      id: cursor++,
      type: CardType.Orange,
    })),
    ...[...Array(FRUIT_COUNT)].map(() => ({
      id: cursor++,
      type: CardType.Pear,
    })),
    ...[...Array(CROW_COUNT)].map(() => ({
      id: cursor++,
      type: CardType.CrowForward,
    })),
  ]);
};

export default createDeck;
