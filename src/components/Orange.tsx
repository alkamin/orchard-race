import { BoxProps, Box, useToken } from "@chakra-ui/react";
import React from "react";

type Props = {
  size: BoxProps["fontSize"];
};

const Orange = ({ size }: Props) => {
  const color = "orange";
  const [shadowColor] = useToken("colors", [`${color}.600`]);
  return (
    <Box fontSize={size} paddingBottom="0.21em" position="relative">
      <Box
        position="relative"
        fontSize={size}
        width="6em"
        height="5.5em"
        borderRadius="50%"
        bg="orange.400"
        boxShadow={`inset 0.2em -0.2em ${shadowColor}`}
        top="0.21em"
        _after={{
          content: "''",
          width: "0.2em",
          height: "1em",
          bg: "brown",
          position: "absolute",
          zIndex: 2,
          top: "-0.2em",
          left: "3em",
        }}
      ></Box>
      <Box
        fontSize="inherit"
        position="absolute"
        top="0.6em"
        left="3.1em"
        height="0"
        width="0"
        bg="green.400"
        border="0.9em solid"
        borderColor="green.400"
        borderRadius="0% 70% 0 70%"
        borderBottomColor="green.600"
        borderRightColor="green.600"
        zIndex={3}
        content="''"
      />
    </Box>
  );
};

export default Orange;
