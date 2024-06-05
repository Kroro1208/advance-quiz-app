import { useEffect, useState } from "react";
import { QuizItem } from "../../types/quiz-type"
import { Box, Flex, Heading, HStack, Radio, RadioGroup, SimpleGrid, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import validAnim from "../../assets/valid.json";
import invalidAnim from "../../assets/invalid.json";
import { Timer } from "./Timer";

export const PlayQuiz = (p: { quiz: QuizItem[] }) => {
    const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
    const [answersList, setAnswersList] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>();
    const [questionStatus, setQuestionStatus] = useState<"valid" | "invalid" | "unanswered">("unanswered");
    const [progress, setProgress] = useState<boolean[]>([]);
    const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];

    useEffect(() => {
        setAnswersList([
            currentQuizItem.correct_answer,
            ...currentQuizItem.incorrect_answers
        ].sort(() => Math.random() - 0.5))
    }, [currentQuizItemIndex])

    useEffect(() => {
        if (answer) {
            const isValid = isValidAnswer(answer);
            if (isValid) {
                setQuestionStatus("valid");
            } else {
                setQuestionStatus("invalid");
            }
            setProgress([...progress, isValid]);
        }
    }, [answer]);


    const isValidAnswer = (answer: string): boolean => {
        return answer === currentQuizItem.correct_answer;
    };

    const renderProgressBar = () => {
        return (
            <HStack>
                {p.quiz.map((_, index) => {
                    return <Box key={index} h={3} w={25} backgroundColor={
                        index >= currentQuizItemIndex ? "gray.200" : progress[index] ? "green.300" : "red.300"
                    } />
                })}
            </HStack>
        )
    }

    const radioList = answersList.map((answerList: string) => {
        return (
            <Radio
                key={answerList}
                value={answerList}
            >
                <Text
                    color={questionStatus === "unanswered" ? "black" : isValidAnswer(answerList) ? "green.400" : "red.400"}
                    dangerouslySetInnerHTML={{ __html: answerList }}>
                </Text>
            </Radio>
        )
    })
    const failQuestion = () => {
        setProgress([...progress, false]);
        setQuestionStatus('invalid');
    }
    return (
        <Flex direction={"column"} alignItems={"center"} justify={"center"}>
            {renderProgressBar()}
            {questionStatus === "unanswered" &&
                (<Box position={"absolute"} top={50} right={50}>
                    <Timer max={10} onFinished={failQuestion} size="120px" />
                </Box>)}
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