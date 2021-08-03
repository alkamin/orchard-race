import { Button, Heading, VStack, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import crowImage from "../images/crow-hi.png";

const Start = () => {
  const crowAnimation1 = useAnimation();

  useEffect(() => {
    crowAnimation1.start({
      x: [0, 100],
      transition: { repeat: Infinity, repeatType: "reverse", duration: 2 },
    });
  });

  return (
    <>
      <motion.div
        animate={crowAnimation1}
        initial={{ position: "absolute", right: "-250px", rotate: "-30deg" }}
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
        <Heading variant="stroked" size="4xl">
          Orchard Race
        </Heading>
        <Heading variant="stroked" size="2xl">
          Which state library should we use?
        </Heading>
        <VStack align="stretch" spacing={10} width="400px">
          <Button size="xl" variant="stroked" colorScheme="indigo">
            Zustand
          </Button>
          <Button size="xl" variant="stroked" colorScheme="indigo">
            Valtio
          </Button>
          <Button size="xl" variant="stroked" colorScheme="indigo">
            Jotai
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default Start;
