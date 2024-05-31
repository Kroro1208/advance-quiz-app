import { Box, Flex, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useState } from "react"

interface Props {
    defaultValue: number;
    max: number;
    min: number;
    step: number;
}

export const SetQuestionQty = ({ defaultValue, max, min, step }: Props) => {
    const [sliderValue, setSliderValue] = useState<number>(defaultValue)

    const renderMarks = (): JSX.Element[] => {
        let marks = [];
        for (let index = min; index <= max; index += step) {
            marks.push(<SliderMark key={index} ml={-3} pt={4} value={index}>{index}</SliderMark>);
        }
        return marks;
    };

    return (
        <Flex direction={"column"} alignItems={"center"}>
            <Heading as="h1" fontSize="3xl" mb={20}>
                How many questions ?
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
    )
}