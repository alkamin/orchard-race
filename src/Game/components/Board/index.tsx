import {
  Box,
  Heading,
  HStack,
  VStack,
  Image,
  Button,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Apple from "../../../components/Apple";
import GameCard from "../../../components/GameCard";
import Orange from "../../../components/Orange";
import Pear from "../../../components/Pear";
import Repeat from "../../../components/Repeat";
import crowImage from "../../../images/crow-hi.png";
import tableImage from "../../../images/retina_wood.png";
import { CardType, GameAPI } from "../../../types";
import GameOver from "./components/GameOver";
import Victory from "./components/Victory";

const CARD_SIZE = "13px";
const TIGHT_SPACING = "-20.825em";
const WIDE_SPACING = "-19em";

type Props = GameAPI & {
  onUnloadBackend: () => void;
};

const Board = ({
  drawCard,
  drawn,
  deck,
  startGame,
  endGame,
  discarded,
  bribe,
  onUnloadBackend,
}: Props) => {
  useEffect(() => {
    startGame();
  }, [startGame]);

  const appleCount = useMemo(
    () => drawn.filter((c) => c.type === CardType.Apple).length,
    [drawn]
  );

  const orangeCount = useMemo(
    () => drawn.filter((c) => c.type === CardType.Orange).length,
    [drawn]
  );

  const pearCount = useMemo(
    () => drawn.filter((c) => c.type === CardType.Pear).length,
    [drawn]
  );

  const crowCount = useMemo(
    () => drawn.filter((c) => c.type === CardType.CrowForward).length,
    [drawn]
  );

  const showGameOver = useMemo(() => crowCount >= 5, [crowCount]);

  const showVictory = useMemo(
    () => appleCount >= 5 && orangeCount >= 5 && pearCount >= 5,
    [appleCount, orangeCount, pearCount]
  );

  const onClickExit = useCallback(() => {
    endGame();
    onUnloadBackend();
  }, [onUnloadBackend, endGame]);

  return (
    <>
      <HStack
        flex="1"
        p={16}
        m={8}
        backgroundImage={tableImage}
        borderRadius="xl"
        boxShadow="xl"
        border="4px solid"
        borderColor="darkAlpha.500"
        alignItems="stretch"
      >
        <VStack flex="1" alignItems="stretch" spacing={8}>
          <HStack flex="1" alignItems="stretch">
            <Stack
              fontSize={CARD_SIZE}
              flex="1"
              spacing={WIDE_SPACING}
              direction="column-reverse"
              alignItems="center"
              justifyContent="flex-start"
              position="relative"
            >
              <Repeat n={appleCount}>
                <GameCard name="Apple" colorScheme="red" fontSize={CARD_SIZE}>
                  <Apple size="1.2em" />
                </GameCard>
              </Repeat>
            </Stack>
            <Stack
              fontSize={CARD_SIZE}
              flex="1"
              spacing={WIDE_SPACING}
              direction="column-reverse"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Repeat n={orangeCount}>
                <GameCard
                  name="Orange"
                  colorScheme="orange"
                  fontSize={CARD_SIZE}
                >
                  <Orange size="1.2em" />
                </GameCard>
              </Repeat>
            </Stack>
            <Stack
              fontSize={CARD_SIZE}
              flex="1"
              spacing={WIDE_SPACING}
              direction="column-reverse"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Repeat n={pearCount}>
                <GameCard name="Pear" colorScheme="yellow" fontSize={CARD_SIZE}>
                  <Pear size="1.2em" />
                </GameCard>
              </Repeat>
            </Stack>

            <Stack
              fontSize={CARD_SIZE}
              flex="1"
              spacing={WIDE_SPACING}
              direction="column-reverse"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Repeat n={crowCount}>
                <GameCard name="Crow" colorScheme="gray" fontSize={CARD_SIZE}>
                  <Image src={crowImage} boxSize="8em" />
                </GameCard>
              </Repeat>
            </Stack>
          </HStack>

          <HStack alignItems="center">
            <Flex flex="1" justifyContent="center">
              <Apple size="18px" />
            </Flex>
            <Flex flex="1" justifyContent="center">
              <Orange size="18px" />
            </Flex>

            <Flex flex="1" justifyContent="center">
              <Pear size="18px" />
            </Flex>

            <Flex flex="1" justifyContent="center">
              <HStack>
                <VStack>
                  <Button
                    variant="stroked"
                    colorScheme="red"
                    size="lg"
                    position="relative"
                    disabled={appleCount < 2 || crowCount < 1}
                    onClick={() => bribe(CardType.Apple)}
                  >
                    <HStack>
                      <Apple size="8px" />
                      <Text>x2</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="stroked"
                    colorScheme="orange"
                    size="lg"
                    position="relative"
                    disabled={orangeCount < 2 || crowCount < 1}
                    onClick={() => bribe(CardType.Orange)}
                  >
                    <HStack>
                      <Orange size="8px" />
                      <Text>x2</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="stroked"
                    colorScheme="yellow"
                    size="lg"
                    position="relative"
                    disabled={pearCount < 2 || crowCount < 1}
                    onClick={() => bribe(CardType.Pear)}
                  >
                    <HStack>
                      <Pear size="7px" />
                      <Text>x2</Text>
                    </HStack>
                  </Button>
                </VStack>
                <Image src={crowImage} boxSize="100px" />
              </HStack>
            </Flex>
          </HStack>
          <HStack alignItems="center">
            <Box flex="1" textAlign="center">
              <Heading variant="stroked" size="2xl" colorScheme="red">
                {appleCount}/5
              </Heading>
            </Box>
            <Box flex="1" textAlign="center">
              <Heading variant="stroked" size="2xl" colorScheme="orange">
                {orangeCount}/5
              </Heading>
            </Box>

            <Box flex="1" textAlign="center">
              <Heading variant="stroked" size="2xl" colorScheme="yellow">
                {pearCount}/5
              </Heading>
            </Box>
            <Box flex="1" textAlign="center">
              <Heading variant="stroked" colorScheme="gray" size="2xl">
                {crowCount}/5
              </Heading>
            </Box>
          </HStack>
        </VStack>
        <VStack justifyContent="flex-end" spacing={8}>
          <VStack spacing={8}>
            <Stack
              fontSize={CARD_SIZE}
              flex="1"
              spacing={TIGHT_SPACING}
              direction="column-reverse"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Repeat n={discarded.length}>
                <GameCard fontSize={CARD_SIZE} />
              </Repeat>
            </Stack>
            <Stack
              fontSize={CARD_SIZE}
              flex="1"
              spacing={TIGHT_SPACING}
              direction="column-reverse"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Repeat n={deck.length}>
                <GameCard fontSize={CARD_SIZE} />
              </Repeat>
            </Stack>
          </VStack>
          <Button
            variant="stroked"
            size="xl"
            colorScheme="indigo"
            onClick={drawCard}
          >
            Draw card
          </Button>
        </VStack>
      </HStack>
      <Button
        size="lg"
        variant="stroked"
        colorScheme="indigo"
        color="lime.100"
        onClick={onClickExit}
        position="absolute"
        zIndex="50"
        m={4}
        opacity="0.75"
        _hover={{
          opacity: "1",
        }}
      >
        Exit
      </Button>
      {showGameOver && <GameOver onUnloadBackend={onClickExit} />}
      {showVictory && <Victory onUnloadBackend={onClickExit} />}
    </>
  );
};

export default Board;
