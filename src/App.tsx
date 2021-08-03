import "@fontsource/chewy";
import "@fontsource/comfortaa";
import React from "react";
import Game from "./Game";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Game />
    </ChakraProvider>
  );
}

export default App;
