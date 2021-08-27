import { VStack, Heading, Flex, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Card from "./Card";

type Props = {
  colorScheme?: string;
  name?: string;
  children?: ReactNode;
  rotate?: boolean;
  fontSize?: BoxProps["fontSize"];
};

const GameCard = ({
  colorScheme,
  children,
  name,
  rotate = false,
  ...rest
}: Props) => {
  const rotateProp: BoxProps = rotate
    ? { transform: "rotate(90deg)", marginTop: "-84px" }
    : {};
  return (
    <Card colorScheme={colorScheme} zIndex={1} {...rotateProp} {...rest}>
      <VStack
        alignSelf="stretch"
        justifyContent="flex-end"
        alignItems="center"
        flex="1"
      >
        <Flex alignItems="center" justifyContent="center" flex="1">
          {children}
        </Flex>
        <Heading color={`${colorScheme}.700`} textAlign="center">
          {name}
        </Heading>
      </VStack>
    </Card>
  );
};

export default GameCard;
