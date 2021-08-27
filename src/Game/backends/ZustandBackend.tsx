import create from "zustand";
import createDeck from "../../lib/createDeck";
import findAndRemove from "../../lib/findAndRemove";
import shuffleArray from "../../lib/shuffleArray";
import { BackendProps, GameAPI, CardType } from "../../types";

const useStore = create<GameAPI>((set, get) => ({
  deck: [],
  drawn: [],
  bribed: [],
  initializeDeck: () => {
    console.log("(Zustand) Initialize backend");
    set({ deck: createDeck(), drawn: [], bribed: [] });
  },
  shutdown: () => {
    console.log("(Zustand) Shutdown backend");
    set({ deck: [], drawn: [], bribed: [] });
  },
  drawCard: () => {
    const [card, ...remaining] = get().deck;

    console.log("(Zustand) Drawing card", JSON.stringify(card));

    if (!remaining.length) {
      /**
       * If there are no more cards left after drawing a card then shuffle
       * the discarded cards and make them the draw pile
       */
      set({ deck: shuffleArray(get().bribed), bribed: [] });
    } else {
      set({ deck: remaining });
    }
    set({ drawn: [card, ...get().drawn] });
  },
  bribe: (cardType: CardType) => {
    console.log("(Zustand) Bribing with cardtype", cardType);

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
        bribed: [card1, card2, crowCard, ...get().bribed],
      });
    }
  },
}));

const ZustandBackend = ({ children }: BackendProps) => {
  const api = useStore();

  return <>{children(api)}</>;
};

export default ZustandBackend;
