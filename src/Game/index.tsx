import backgroundImage from "../images/bkg-apples.png";
import { Backend } from "../types";
import Start from "./components/Start";
import { Flex } from "@chakra-ui/react";
import Board from "./components/Board";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import GetBackend from "./components/GetBackend";

const backendAtom = atomWithStorage<Backend | null>("backend", null);

const Game = () => {
  const [backend, setBackend] = useAtom(backendAtom);

  return (
    <Flex
      minHeight="100vh"
      position="relative"
      overflow="hidden"
      _before={{
        content: "''",
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${backgroundImage})`,
        filter: "opacity(66%)",
      }}
    >
      <Flex flex="1" position="relative" alignSelf="stretch">
        {backend === null ? (
          <Start onBackendSelect={setBackend} />
        ) : (
          <GetBackend backend={backend}>
            {(api) => (
              <Board {...api} onUnloadBackend={() => setBackend(null)} />
            )}
          </GetBackend>
        )}
      </Flex>
    </Flex>
  );
};

export default Game;
