import { useState } from "react";
import backgroundImage from "../images/bkg-apples.png";
import { Backend, BackendProps } from "../types";
import Start from "./Start";
import { Flex } from "@chakra-ui/react";
import Board from "./Board";
import ZustandBackend from "./backends/ZustandBackend";
import JotaiBackend from "./backends/JotaiBackend";
import ValtioBackend from "./backends/ValtioBackend";

type GetBackendProps = BackendProps & {
  backend: Backend;
};

const GetBackend = ({ backend, children }: GetBackendProps) => {
  switch (backend) {
    case Backend.Zustand:
      return <ZustandBackend>{(api) => children(api)}</ZustandBackend>;
    case Backend.Jotai:
      return <JotaiBackend>{(api) => children(api)}</JotaiBackend>;
    case Backend.Valtio:
      return <ValtioBackend>{(api) => children(api)}</ValtioBackend>;
  }
};

const Game = () => {
  const [backend, setBackend] = useState<Backend | null>(null);

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
