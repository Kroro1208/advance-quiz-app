import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useState } from "react"

interface Props {
    defaultValue: number;
    max: number;
    min: number;
    step: number;
    onClickNext: (amount: number) => void;
}

export const SetQuizQuantity = ({ defaultValue, max, min, step, onClickNext }: Props) => {
    const [sliderValue, setSliderValue] = useState<number>(defaultValue)

    const renderMarks = (): JSX.Element[] => {
        let marks = [];
        for (let index = min; index <= max; index += step) {
            marks.push(<SliderMark key={index} ml={-3} pt={4} value={index}>{index}</SliderMark>);
        }
        return marks;
    };


    return (
        <>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as="h1" fontSize="3xl" mb={20}>
                    いくつの問題にチャレンジしますか ?
                </Heading>
                <Slider value={sliderValue} maxW={600} max={max} min={min} step={step} aria-label='slider-ex-6' colorScheme="orange"
                    onChange={(val) => setSliderValue(val)}>
                    {renderMarks()}
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>
            <Button
                onClick={() => onClickNext(sliderValue)}
                mt={"20"} textColor={"white"} bgColor={"red"} position={"absolute"} top={"80%"} right={"10%"} rightIcon={<ArrowForwardIcon />}>
                カテゴリーを選ぶ
            </Button>
        </>
    )
}