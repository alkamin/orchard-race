import { VStack, Heading, Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  onUnloadBackend: () => void;
};

const Victory = ({ onUnloadBackend }: Props) => (
  <VStack
    position="absolute"
    inset={0}
    bg="rgba(255,255,255,.75)"
    align="center"
    spacing={12}
    justifySelf="center"
    flex="1"
    justifyContent="center"
    zIndex="100"
  >
    <Heading variant="stroked" size="4xl" color="yellow.100" textAlign="center">
      You win!
    </Heading>
    <VStack align="stretch" spacing={10}>
      <Button
        size="xl"
        variant="stroked"
        colorScheme="indigo"
        color="lime.100"
        onClick={onUnloadBackend}
      >
        Back to the orchard
      </Button>
    </VStack>
  </VStack>
);

export default Victory;
