
import { type Question as QuestionType } from './types'
import { useQuestionStore } from './store/questions'
import {
  Typography,
  Card,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  if (userSelectedAnswer == null) return 'transparent'
  if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  if(index === correctAnswer) return 'green'
  if(index === userSelectedAnswer) return 'red'
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer)
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  return (
    <Card
      variant='outlined'
      sx={{ bgcolor: '##ee', p: 2, textAlign: 'left', marginTop: 4 }}
    >
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighLighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ background: getBackgroundColor(info, index)}}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
export const Game = () => {
  const questions = useQuestionStore((state) => state.questions)
  const currentQuestion = useQuestionStore((state) => state.currentQuestion)
  const questionInfo = questions[currentQuestion]
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion)
  const goPreviousQuestion = useQuestionStore((state) => state.goPreviousQuestion)
  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIos/>
        </IconButton>
        { currentQuestion + 1 } / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion > questions.length - 1}>
          <ArrowForwardIos/>
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
