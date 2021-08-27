import { useCallback, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";
import createDeck from "../../lib/createDeck";
import findAndRemove from "../../lib/findAndRemove";
import shuffle from "../../lib/shuffle";
import { BackendProps, CardType, GameAPI, GameState } from "../../types";

const initialState: GameState = {
  deck: [],
  drawn: [],
  discarded: [],
};

const state = proxy(initialState);

const ValtioBackend = ({ children }: BackendProps) => {
  const snapshot = useSnapshot(state);

  const startGame = useCallback(() => {
    console.log("(Valtio) Initialize deck called");

    /**
     * Start a new game by creating a fresh deck of cards and clearing
     * the discarded and drawn card arrays
     */
    state.deck = createDeck();
    state.discarded = [];
    state.drawn = [];
  }, []);

  const endGame = useCallback(() => {
    console.log("(Valtio) endGame backend");

    /**
     * When the game is over, ensure the state is cleared and any synced
     * data reflects that
     */

    state.deck = [];
    state.discarded = [];
    state.drawn = [];
  }, []);

  const drawCard = useCallback(() => {
    const [card, ...remaining] = state.deck;

    console.log("(Valtio) Drawing card", JSON.stringify(card));

    if (!remaining.length) {
      /**
       * If there are no more cards left after drawing a card then shuffle
       * the discarded cards and make them the draw pile
       */
      state.deck = shuffle(state.discarded);
      state.discarded = [];
    } else {
      state.deck = remaining;
    }
    state.drawn = [card, ...state.drawn];
  }, []);

  const bribe = useCallback((cardType: CardType) => {
    console.log("(Valtio) Bribing with cardtype", cardType);

    /**
     * Attempt to remove two cards of the specified fruit type and one crow card
     */

    const [drawn1, card1] = findAndRemove(
      state.drawn,
      (c) => c.type === cardType
    );
    const [drawn2, card2] = findAndRemove(drawn1, (c) => c.type === cardType);
    const [drawnF, crowCard] = findAndRemove(
      drawn2,
      (c) => c.type === CardType.CrowForward
    );

    if (card1 && card2 && crowCard) {
      state.drawn = drawnF;
      state.discarded = [card1, card2, crowCard, ...state.discarded];
    }
  }, []);

  const apiAdapter: GameAPI = useMemo(
    () => ({
      ...snapshot,
      startGame,
      endGame,
      drawCard,
      bribe,
    }),
    [bribe, drawCard, startGame, endGame, snapshot]
  );
  return <>{children(apiAdapter)}</>;
};

export default ValtioBackend;
