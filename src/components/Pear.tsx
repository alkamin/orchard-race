import { BoxProps, Box, useToken } from "@chakra-ui/react";
import React from "react";

type Props = {
  size: BoxProps["fontSize"];
};

const Pear = ({ size }: Props) => {
  const color = "yellow";
  const [shadowColor] = useToken("colors", [`${color}.600`]);
  return (
    <Box fontSize={size} paddingBottom="1.5em" position="relative">
      <Box
        position="relative"
        fontSize={size}
        width="6em"
        height="5.5em"
        borderRadius="50% 15% 50% 50%"
        bg="yellow.400"
        boxShadow={`inset 0.15em 0.2em ${shadowColor}`}
        top="1.36em"
        transform="rotate(-45deg)"
        _after={{
          content: "''",
          width: "0.2em",
          height: "1em",
          bg: "brown",
          position: "absolute",
          zIndex: 2,
          top: "-0.15em",
          left: "5.6em",
          transform: "rotate(45deg)",
        }}
      ></Box>
      <Box
        fontSize="inherit"
        position="absolute"
        top="0.2em"
        left="1.3em"
        height="0"
        width="0"
        bg="green.400"
        border="0.9em solid"
        borderColor="lime.500"
        borderRadius="70% 0 70% 0%"
        borderBottomColor="lime.700"
        borderRightColor="lime.700"
        zIndex={3}
        content="''"
      />
    </Box>
  );
};

export default Pear;
