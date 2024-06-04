import { useEffect, useState } from "react";
import { QuizItem } from "../types/quiz-type"
import { Flex, Heading, Radio, RadioGroup, SimpleGrid, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import validAnim from "../assets/valid.json";
import invalidAnim from "../assets/invalid.json";

export const PlayQuiz = (p: { quiz: QuizItem[] }) => {
    const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
    const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];
    const [answersList, setAnswersList] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>();
    const [questionStatus, setQuestionStatus] = useState<"valid" | "invalid" | "unanswered">("unanswered");

    useEffect(() => {
        setAnswersList([
            currentQuizItem.correct_answer,
            ...currentQuizItem.incorrect_answers
        ].sort(() => Math.random() - 0.5))
    }, [currentQuizItemIndex])

    useEffect(() => {
        if (answer) {
            if (isValidAnswer(answer)) {
                setQuestionStatus("valid");
            } else {
                setQuestionStatus("invalid");
            }
        }
    }, [answer]);


    const isValidAnswer = (answer: string): boolean => {
        return answer === currentQuizItem.correct_answer;
    };

    const radioList = answersList.map((answerList: string) => {
        return (
            <Radio
                key={answerList}
                value={answerList}
            >
                <Text dangerouslySetInnerHTML={{ __html: answerList }}>
                </Text>
            </Radio>
        )
    })
    return (
        <Flex direction={"column"} alignItems={"center"} justify={"center"}>
            <Heading fontSize={"3xl"} mt={100} mb={20} dangerouslySetInnerHTML={{ __html: currentQuizItem.question }} />
            <RadioGroup value={answer} onChange={questionStatus === "unanswered" ? setAnswer : undefined}>
                <SimpleGrid columns={2} spacing={4}>
                    {radioList}
                </SimpleGrid>
            </RadioGroup>
            <Lottie loop={false} style={{ marginTop: 100, height: 150 }}
                animationData={questionStatus === "unanswered"
                    ? null
                    : questionStatus === "valid"
                        ? validAnim
                        : invalidAnim}
                onComplete={() => {
                    setQuestionStatus("unanswered");
                    setCurrentQuizItemIndex(currentQuizItemIndex + 1);
                }} />
        </Flex>
    )
}