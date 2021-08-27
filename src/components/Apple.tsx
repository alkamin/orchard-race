import { Box, BoxProps, useToken } from "@chakra-ui/react";
import React from "react";

type Props = {
  size: BoxProps["fontSize"];
};

const Apple = ({ size }: Props) => {
  const color = "red";

  const [bgColor, shadowColor] = useToken("colors", [
    `${color}.500`,
    `${color}.700`,
  ]);

  return (
    <Box position="relative" paddingBottom="1.2em" fontSize={size}>
      <Box
        fontSize={size}
        width="6em"
        height="5em"
        bg="red.500"
        boxShadow={`inset 0.2em -0.2em ${shadowColor}`}
        borderRadius="2em 2em 3em 3em"
        position="relative"
        top="1em"
        _before={{
          top: "-.2em",
          left: "1.8em",
          content: "''",
          width: "4.1em",
          height: "2.75em",
          bg: "inherit",
          borderRadius: "3em 3em 0 0",
          position: "absolute",
          boxShadow: `-1.5em 0 0 ${bgColor}, inset .2em 0.2em ${bgColor}`,
        }}
        _after={{
          content: "''",
          width: "0.2em",
          height: "1em",
          bg: "brown",
          position: "absolute",
          zIndex: 2,
          top: "-0.5em",
          left: "3em",
        }}
      >
        <Box
          fontSize="inherit"
          position="absolute"
          top="-1em"
          left="3.1em"
          height="0"
          width="0"
          border="0.75em solid"
          borderColor="green.300"
          borderRadius="900% 0 900% 0"
          borderBottomColor="green.500"
          borderRightColor="green.500"
          content="''"
        />
      </Box>
    </Box>
  );
};

export default Apple;
