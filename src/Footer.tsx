import { useQuestionStore } from './store/questions'
import { Button } from '@mui/material'

const useQuestionsData = () => {
  const questions = useQuestionStore((state) => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })
  return { correct, incorrect, unanswered }
}

export const Footer = () => {
  const {correct, incorrect, unanswered} = useQuestionsData()
  const reset = useQuestionStore(state => state.reset)
  return (
    <footer style={{marginTop: '16px'}}>

      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unanswered} sin responder`}</strong>

      <div>
        <Button onClick={() => reset()}>
          Resetear Juego
        </Button>
      </div>
    </footer>
  )
}
