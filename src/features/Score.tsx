import { Button, Flex, Heading, Text } from "@chakra-ui/react";

export const Score = (p: { progress: boolean[], onNext: () => void }) => {
    const correctAnswers = p.progress.filter((isValidAnswer: boolean) => isValidAnswer === true).length;
    const renderMessage = () => {
        const correctAnswerPercentage = (correctAnswers * 100) / p.progress.length;
        if (correctAnswerPercentage < 30) {
            return "もう少し頑張りましょう！"
        } else if (correctAnswerPercentage < 50) {
            return "悪くないですね！継続して取り組みましょう！"
        } else if (correctAnswerPercentage < 75) {
            return "あなたは優秀です！"
        } else {
            return "天才かよ！！"
        }
    }
    return (
        <Flex direction={"column"} alignItems={"center"}>
            <Heading fontSize={"3xl"}>
                Score
            </Heading>
            <Heading fontSize={"xl"} mt={"5"}>
                {correctAnswers}/{p.progress.length}
            </Heading>
            <Text fontWeight={"bold"} mt={20}>
                {renderMessage()}
            </Text>
            <Button position="absolute" top={"80%"} right={"10%"} onClick={p.onNext} backgroundColor="green" color="white">
                もう一度ゲームする
            </Button>
        </Flex>
    );
}
