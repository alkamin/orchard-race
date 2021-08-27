import { Button, Heading, VStack, Image, useInterval } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import crowImage from "../images/crow-hi.png";
import { Backend } from "../types";

type Props = {
  onBackendSelect: (backend: Backend) => void;
};

const Start = ({ onBackendSelect }: Props) => {
  const crowAnimation1 = useAnimation();

  useEffect(() => {
    crowAnimation1.start({
      x: [0, -300, -300, 0],
      transition: { duration: 2.5 },
    });
  }, [crowAnimation1]);

  useInterval(() => {
    crowAnimation1.start({
      x: [0, -300, -300, 0],
      transition: { duration: 2.5 },
    });
  }, 5000);

  return (
    <>
      <motion.div
        animate={crowAnimation1}
        initial={{ position: "absolute", right: "-550px", rotate: "-30deg" }}
      >
        <Image src={crowImage} boxSize="500px" />
      </motion.div>
      <VStack
        align="center"
        spacing={12}
        justifySelf="center"
        flex="1"
        justifyContent="center"
        zIndex="1"
      >
        <Heading
          variant="stroked"
          size="4xl"
          color="yellow.100"
          textAlign="center"
        >
          Orchard Race
        </Heading>
        <Heading
          variant="stroked"
          size="2xl"
          color="indigo.100"
          textAlign="center"
        >
          Choose a Poimdandres state library to begin
        </Heading>
        <VStack align="stretch" spacing={10} width="400px">
          <Button
            size="xl"
            variant="stroked"
            colorScheme="indigo"
            color="lime.100"
            onClick={() => onBackendSelect(Backend.Zustand)}
          >
            Zustand
          </Button>
          <Button
            size="xl"
            variant="stroked"
            colorScheme="indigo"
            color="lime.100"
            onClick={() => onBackendSelect(Backend.Valtio)}
          >
            Valtio
          </Button>
          <Button
            size="xl"
            variant="stroked"
            colorScheme="indigo"
            color="lime.100"
            onClick={() => onBackendSelect(Backend.Jotai)}
          >
            Jotai
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default Start;
