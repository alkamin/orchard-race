import React from "react";
import backgroundImage from "../images/bkg-apples.png";
import { Phase } from "../types";
import Start from "./Start";
import { Flex } from "@chakra-ui/react";

const getScreen = (phase: Phase) => {
  switch (phase) {
    case Phase.Start: {
      return <Start />;
    }
  }
};

const Game = () => {
  const phase: Phase = Phase.Start;

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
        filter: "opacity(50%)",
      }}
    >
      <Flex flex="1" position="relative" alignSelf="stretch">
        {getScreen(phase)}
      </Flex>
    </Flex>
  );
};

export default Game;
