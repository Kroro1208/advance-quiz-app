import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "./assets/idea.png"
import bubble from "./assets/bubble.jpg"

import "../global.css"
import { useEffect, useState } from "react";
import { SetQuizQuantity } from "./features/SetQuizQuantity";
import axios from "axios";
import { FetchQuizParams, QuizCategory, QuizDifficulty, QuizItem, QuizType } from "./types/quiz-type";
import { SetQuizCategory } from "./features/SetQuizCategory";
import { QuizAPI } from "./api/quiz-api";
import { SetQuizDifficulty } from "./features/SetQuizDifficulty";
import { Play } from "./features/Play";

enum Step {
  SetQuestionQuantity,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score
}

axios.get("https//trivia", { params: { amount: 2, category: "science" } })

export const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQuantity);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple
  });

  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);


  useEffect(() => {
    (async () => {
      setCategories([{
        id: -1, // フェッチしてきたdataの中にMixedはないから特別な値として手動で追加
        name: "MIxed"
      }, ...(await QuizAPI.fetchCategories())]);
    })();
  }, []);

  const header = (
    <Flex justify="center" mt={"4"}>
      <Image h="24" src={logo} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQuantity:
        return (
          <SetQuizQuantity
            defaultValue={10} max={30} min={5} step={5}
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }} />
        );
      case Step.SetQuestionCategory:
        return (<SetQuizCategory
          onClickNext={(category: string) => {
            setQuizParams({
              ...quizParams,
              category: category === "-1" ? "" : category // Mixedならカテゴリは空文字
            });
            setStep(Step.SetQuestionDifficulty);
          }}
          categories={categories} />);
      case Step.SetQuestionDifficulty:
        return (
          <SetQuizDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = {
                ...quizParams,
                difficulty
              }
              setQuizParams(params);
              const quizResponse = await QuizAPI.fetchQuiz(params);
              if (quizResponse.length > 0) {
                setQuiz(quizResponse);
                setStep(Step.Play);
              } else {
                alert(`あなたが選択したカテゴリでは、あなたが希望する問題数${params.amount}門のクイズが見つかりませんでした`);
                setStep(Step.SetQuestionQuantity);
              };
            }} />
        );
      case Step.Play:
        return <Play quiz={quiz} />
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