import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button, Flex, Heading, Radio, RadioGroup, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { QuizDifficulty } from "../types/quiz-type"

export const SetQuizDifficulty = (p: { onClickNext: (difficult: QuizDifficulty) => void }) => {
    const [difficulty, setCurrentDifficulty] = useState<QuizDifficulty>(QuizDifficulty.Mixed);
    const radioList = Object.values(QuizDifficulty).map((diff: QuizDifficulty) => {
        return (
            <Radio key={diff} value={diff}>
                <span style={{ textTransform: "capitalize" }}>{diff === QuizDifficulty.Mixed ? "Random" : diff}</span>
            </Radio>
        )
    });
    return (
        <>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as="h1" fontSize="3xl" mb={20}>
                    難易度を選んでください
                </Heading>
            </Flex>
            <RadioGroup
                value={difficulty} onChange={setCurrentDifficulty as (d: string) => void}>
                <VStack>
                    {radioList}
                </VStack>
            </RadioGroup >
            <Button
                onClick={() => p.onClickNext(difficulty)}
                mt={"20"} textColor={"white"} bgColor={"blue"} position={"absolute"} top={"80%"} right={"10%"}
                rightIcon={<ArrowForwardIcon />}>
                クイズ開始
            </Button>
        </>
    )
}