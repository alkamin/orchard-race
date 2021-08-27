import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import createDeck from "../../lib/createDeck";
import findAndRemove from "../../lib/findAndRemove";
import shuffle from "../../lib/shuffle";
import { BackendProps, Card, CardType, GameAPI } from "../../types";

const deckAtom = atom<Card[]>([]);
const drawnAtom = atom<Card[]>([]);
const discardedAtom = atom<Card[]>([]);

const JotaiBackend = ({ children }: BackendProps) => {
  const [deck, setDeck] = useAtom(deckAtom);
  const [drawn, setDrawn] = useAtom(drawnAtom);
  const [discarded, setDiscarded] = useAtom(discardedAtom);

  const startGame = useCallback(() => {
    console.log("(Jotai) Initialize backend");

    /**
     * Start a new game by creating a fresh deck of cards and clearing
     * the discarded and drawn card arrays
     */

    setDeck(createDeck());
    setDiscarded([]);
    setDrawn([]);
  }, [setDiscarded, setDeck, setDrawn]);

  const endGame = useCallback(() => {
    console.log("(Jotai) endGame backend");

    /**
     * When the game is over, ensure the state is cleared and any synced
     * data reflects that
     */

    setDeck([]);
    setDiscarded([]);
    setDrawn([]);
  }, [setDiscarded, setDeck, setDrawn]);

  const drawCard = useCallback(() => {
    const [card, ...remaining] = deck;

    console.log("(Jotai) Drawing card", JSON.stringify(card));

    if (!remaining.length) {
      /**
       * If there are no more cards left after drawing a card then shuffle
       * the discarded cards and make them the draw pile
       */
      setDeck(shuffle(discarded));
      setDiscarded([]);
    } else {
      setDeck(remaining);
    }
    setDrawn((prev) => [card, ...prev]);
  }, [discarded, deck, setDiscarded, setDeck, setDrawn]);

  const bribe = useCallback(
    (cardType: CardType) => {
      console.log("(Jotai) Bribing with cardtype", cardType);

      /**
       * Attempt to remove two cards of the specified fruit type and one crow card
       */

      const [drawn1, card1] = findAndRemove(drawn, (c) => c.type === cardType);
      const [drawn2, card2] = findAndRemove(drawn1, (c) => c.type === cardType);
      const [drawnF, crowCard] = findAndRemove(
        drawn2,
        (c) => c.type === CardType.CrowForward
      );

      if (card1 && card2 && crowCard) {
        setDrawn(drawnF);
        setDiscarded((prev) => [card1, card2, crowCard, ...prev]);
      }
    },
    [drawn, setDiscarded, setDrawn]
  );

  const propsAdapter: GameAPI = useMemo(
    () => ({
      deck,
      drawn,
      discarded,
      startGame,
      endGame,
      drawCard,
      bribe,
    }),
    [bribe, discarded, deck, drawCard, drawn, startGame, endGame]
  );

  return <>{children(propsAdapter)}</>;
};

export default JotaiBackend;
