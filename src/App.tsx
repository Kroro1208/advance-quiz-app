import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "./assets/idea.png"
import bubble from "./assets/bubble.jpg"

import "../global.css"
import { useEffect, useState } from "react";
import { SetQuestionQty } from "./features/SetQuestionQty";
import axios from "axios";
import { FetchQuizParams, QuizCategory, QuizDifficulty, QuizType } from "./types/quiz-type";
import { SetQuestionCategory } from "./features/SetQuestionCategory";
import { QuizAPI } from "./api/quiz-api";

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
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple
  });

  const [categories, setCategories] = useState<QuizCategory[]>([]);
  useEffect(() => {
    (async () => {
      setCategories(await QuizAPI.fetchCategories());
    })();
  }, []);

  const header = (
    <Flex justify="center" mt={"4"}>
      <Image h="24" src={logo} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty defaultValue={10} max={30} min={5} step={5}
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }} />
        );

      case Step.SetQuestionCategory:
        return <SetQuestionCategory categories={categories} />
      case Step.Play:
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
          top={30}
          width="800px"
          height="800px"
          opacity={0.2} />
        <Box mt={100}>{renderScreenByStep()}</Box>
      </Box>
    </>
  );
}