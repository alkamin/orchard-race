import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps & {
  variant?: "game";
  colorScheme?: string;
};

function Card({ variant = "game", colorScheme, ...rest }: Props) {
  const styles = useStyleConfig("Card", { variant, colorScheme });
  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />;
}

export default Card;
