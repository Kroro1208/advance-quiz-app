import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
let timer: NodeJS.Timeout

export const Timer = (p: { max: number; onFinished: () => void; size?: string }) => {
    const [proceed, setProceed] = useState<number>(p.max);

    useEffect(() => {
        if (proceed <= 0) {
            p.onFinished();
            clearInterval(timer);
        }
    }, [proceed])

    useEffect(() => {
        timer = setInterval(() => {
            setProceed((prevProceed) => prevProceed - 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    const progressColor = proceed <= 3 ? 'red.400' : 'green.400';
    return (
        <CircularProgress max={p.max} value={proceed} color={progressColor} size={p.size}>
            <CircularProgressLabel>{proceed}</CircularProgressLabel>
        </CircularProgress>
    )
}