import { QuizItem } from "../types/quiz-type"

export const Play = (p: { quiz: QuizItem[] }) => {
    console.log(p.quiz);
    return (
        <div>
            Play Start !!
        </div>
    )
}