import create from "zustand";
import createDeck from "../../lib/createDeck";
import findAndRemove from "../../lib/findAndRemove";
import shuffle from "../../lib/shuffle";
import { BackendProps, GameAPI, CardType } from "../../types";

const useStore = create<GameAPI>((set, get) => ({
  deck: [],
  drawn: [],
  discarded: [],
  startGame: () => {
    console.log("(Zustand) Start game");

    /**
     * Start a new game by creating a fresh deck of cards and clearing
     * the discarded and drawn card arrays
     */

    set({ deck: createDeck(), drawn: [], discarded: [] });
  },
  endGame: () => {
    console.log("(Zustand) end game");

    /**
     * When the game is over, ensure the state is cleared and any synced
     * data reflects that
     */

    set({ deck: [], drawn: [], discarded: [] });
  },
  drawCard: () => {
    const [card, ...remaining] = get().deck;

    console.log("(Zustand) Drawing card", JSON.stringify(card));

    if (!remaining.length) {
      /**
       * If there are no more cards left after drawing a card then shuffle
       * the discarded cards and make them the draw pile
       */
      set({ deck: shuffle(get().discarded), discarded: [] });
    } else {
      set({ deck: remaining });
    }
    set({ drawn: [card, ...get().drawn] });
  },
  bribe: (cardType: CardType) => {
    console.log("(Zustand) Bribing with cardtype", cardType);

    /**
     * Attempt to remove two cards of the specified fruit type and one crow card
     */

    const [drawn1, card1] = findAndRemove(
      get().drawn,
      (c) => c.type === cardType
    );
    const [drawn2, card2] = findAndRemove(drawn1, (c) => c.type === cardType);
    const [drawnF, crowCard] = findAndRemove(
      drawn2,
      (c) => c.type === CardType.CrowForward
    );
    if (card1 && card2 && crowCard) {
      set({
        drawn: drawnF,
        discarded: [card1, card2, crowCard, ...get().discarded],
      });
    }
  },
}));

const ZustandBackend = ({ children }: BackendProps) => {
  const api = useStore();

  return <>{children(api)}</>;
};

export default ZustandBackend;
