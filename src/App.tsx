import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "./assets/idea.png"
import bubble from "./assets/bubble.jpg"

import "../global.css"
import { useState } from "react";
import { SetQuestionQty } from "./features/SetQuestionQty";
import axios from "axios";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score
}

axios.get("https//trivia", { params: { amount: 2, category: "science" } })

export const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const header = (
    <Flex justify="center" mt={"4"}>
      <Image h="24" src={logo} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return <SetQuestionQty defaultValue={10} max={30} min={5} step={5} />
      case Step.SetQuestionCategory:
        return <></>
      case Step.play:
        return <></>
      case Step.Score:
        return <></>
      default:
        return null;
    }
  }

  return (
    <>
      <Box py={"10"} h="100%">
        {header}
        <Image
          src={bubble}
          position={"absolute"}
          zIndex={-1}
          right={-120}
          top={80}
          width="800px"
          height="800px"
          opacity={0.2} />
        <Box mt={100}>{renderScreenByStep()}</Box>
      </Box>
    </>
  );
}