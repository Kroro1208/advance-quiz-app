import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "./assets/idea.png"
import "../global.css"
export const App = () => {
  const header = (
    <Flex justify="center" mt={"8"}>
      <Image h="24" src={logo} />
    </Flex>
  );
  return (
    <>
      <Box py={"10"} h="100%">
        {header}
        <Box>Todo</Box>
      </Box>
    </>
  );
}