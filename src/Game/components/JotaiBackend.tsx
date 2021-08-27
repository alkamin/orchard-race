import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import createDeck from "../../lib/createDeck";
import findAndRemove from "../../lib/findAndRemove";
import shuffle from "../../lib/shuffle";
import { BackendProps, Card, CardType, GameAPI } from "../../types";

const deckAtom = atom<Card[]>([]);
const drawnAtom = atom<Card[]>([]);
const bribedAtom = atom<Card[]>([]);

const JotaiBackend = ({ children }: BackendProps) => {
  const [deck, setDeck] = useAtom(deckAtom);
  const [drawn, setDrawn] = useAtom(drawnAtom);
  const [bribed, setBribed] = useAtom(bribedAtom);

  const initializeDeck = useCallback(() => {
    console.log("(Jotai) Initialize backend");

    setDeck(createDeck());
    setBribed([]);
    setDrawn([]);
  }, [setBribed, setDeck, setDrawn]);

  const shutdown = useCallback(() => {
    console.log("(Jotai) Shutdown backend");

    setDeck([]);
    setBribed([]);
    setDrawn([]);
  }, [setBribed, setDeck, setDrawn]);

  const drawCard = useCallback(() => {
    const [card, ...remaining] = deck;

    console.log("(Jotai) Drawing card", JSON.stringify(card));

    if (!remaining.length) {
      /**
       * If there are no more cards left after drawing a card then shuffle
       * the discarded cards and make them the draw pile
       */
      setDeck(shuffle(bribed));
      setBribed([]);
    } else {
      setDeck(remaining);
    }
    setDrawn((prev) => [card, ...prev]);
  }, [bribed, deck, setBribed, setDeck, setDrawn]);

  const bribe = useCallback(
    (cardType: CardType) => {
      console.log("(Jotai) Bribing with cardtype", cardType);

      const [drawn1, card1] = findAndRemove(drawn, (c) => c.type === cardType);
      const [drawn2, card2] = findAndRemove(drawn1, (c) => c.type === cardType);
      const [drawnF, crowCard] = findAndRemove(
        drawn2,
        (c) => c.type === CardType.CrowForward
      );

      if (card1 && card2 && crowCard) {
        setDrawn(drawnF);
        setBribed((prev) => [card1, card2, crowCard, ...prev]);
      }
    },
    [drawn, setBribed, setDrawn]
  );

  const propsAdapter: GameAPI = useMemo(
    () => ({
      deck,
      drawn,
      bribed,
      initializeDeck,
      shutdown,
      drawCard,
      bribe,
    }),
    [bribe, bribed, deck, drawCard, drawn, initializeDeck, shutdown]
  );

  return <>{children(propsAdapter)}</>;
};

export default JotaiBackend;
