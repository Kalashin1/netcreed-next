import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { ThemeContext, fontFamily } from '../pages/_app';
import { useContext, useState, FC, useEffect } from 'react';
import { addQuestions, getLesson } from '../helper';
import { randomBytes } from 'crypto';
import { QuestionSchema, Option } from '../types';
import { useRouter } from 'next/router';

interface QuestionFormProps {
  lessonId: string;
}

const _options: Option[] = [
  {
    id: randomBytes(16).toString('hex'),
    answer: 'option 1',
    isCorrect: false
  },
  {
    id: randomBytes(16).toString('hex'),
    answer: 'option 1',
    isCorrect: false
  },
  {
    id: randomBytes(16).toString('hex'),
    answer: 'option 1',
    isCorrect: false
  },
  {
    id: randomBytes(16).toString('hex'),
    answer: 'option 1',
    isCorrect: false
  }
]

const QuestionForm: FC<QuestionFormProps> = ({
  lessonId,
}) => {

  const [question, setQuestion] = useState('')
  const [correctOption, setCorrectOption] = useState<Option>(_options[0])
  const [isRequired, setIsRequired] = useState(false);
  const [lesson, setLesson] = useState('');
  const [options, setOptions] = useState<Option[]>(_options);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [marks, setMarks] = useState(5);
  const [attempts, setAttempts] = useState(2);

  const gotoLesson = () => {
    router.push('/lessons/' + lessonId)
  }

  const createQuestion = async (e: any) => {
    e.preventDefault();
    setShowSpinner(true)
    const newQuestion: QuestionSchema = {
      id: randomBytes(16).toString('hex'),
      correctAnswer: correctOption,
      options,
      question,
      marks,
      maxAttempts: attempts,
      required: isRequired,
    }
    const [payload, err] = await addQuestions(
      [newQuestion],
      'LESSON',
      lessonId
    )
    setShowSpinner(false)
    if (err) {
      console.log(err)
    } else if (payload) {
      console.log(payload)
      router.push(`/lessons/${lessonId}`)
    }
  }

  useEffect(() => {
    const setup = async () => {
      const [lesson, err] = await getLesson(lessonId)
      if (err) {
        alert('oops something happened, try again')
        router.back()
      } else if (lesson) {
        setLesson(lesson.title);
      }
    }

    setup();
  }, [lessonId, router])


  const { theme } = useContext(ThemeContext);
  const textColor = theme === 'dark' ? 'white' : 'black';
  const color = theme === 'dark' ? 'black' : 'white';
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Card bg={color}>
            <Row>
              <Col xs={12} md={8}>
                <Card.Title className={`m-4 text-${textColor}`}>Lesson: {lesson}</Card.Title>
              </Col>
              <Col md={4}>
                <Row className="my-2 px-3">
                  <Col xs={12} sm={6}>
                    <Form.Group className="my-2 px-3">
                      <Form.Label className={`text-${textColor}`}>Marks</Form.Label>
                      <Form.Control value={marks} type="number" onChange={(e) => { setMarks(Number(e.target.value)) }} className={`bg-${theme} text-${textColor}`} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="my-2 px-3">
                      <Form.Label className={`text-${textColor}`}>Attempts</Form.Label>
                      <Form.Control type="number" value={attempts} onChange={(e) => { setAttempts(Number(e.target.value)) }} className={`bg-${theme} text-${textColor}`} />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
           

            <Card.Body>
              <div style={{ width: '100%' }}>
                <Card.Text className={`text-${textColor}`}>Whats your question</Card.Text>
                <textarea value={question} onChange={e => setQuestion(e.target.value)} className={`bg-${theme} my-2 text-${textColor}`} style={{ width: '100%', height: '20vh' }}></textarea>
              </div>

              <h6 className={`text-${textColor}`}>Answers</h6>

              <Row>
                {options && options.map((option, index) => (
                  <Col key={index} sm={6}>
                    <Card className={`p-2 my-2 border border-primary rounded bg-${color}`}>
                      <Row>
                        <Col xs={10}>
                          <input value={option.answer} onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index].answer = e.target.value;
                            setOptions(newOptions)
                          }} style={{ width: '100%' }} placeholder='option 1' className={`p-4 border-0 bg-${color} text-${textColor}`} />
                        </Col>
                        <Col xs={2} className="px-2">
                          <input type="radio" name="correctQuestion" checked={option.id === correctOption.id} value={`${option.id}`} onChange={(e) => {
                            const newOptions = Array.from(options.map(({answer, id}) => {
                              return ({answer, id, isCorrect: false})
                            }));
                            console.log(newOptions)
                            if (!option?.isCorrect && option.id === e.target.value) {
                              newOptions[index].isCorrect = true;
                              console.log(newOptions[index])
                              setCorrectOption(newOptions[index])
                            }
                            setOptions(newOptions)
                          }} />
                        </Col>
                      </Row>

                    </Card>
                  </Col>))}
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="my-2 px-3">
                    <input value={marks} type="checkbox" onChange={(e) => { setIsRequired(!isRequired) }} className={`bg-${theme} text-${textColor}`} />
                    <Form.Label className={`text-${textColor} ml-2`}>Make This question required</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Button
                    variant="primary"
                    className="mb-4"
                    style={{ width: '100%', fontFamily }}
                    onClick={createQuestion}
                  >
                    {showSpinner && (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
                    {!showSpinner && 'Add Question'}
                  </Button>
                </Col>
                <Col xs={12} md={6}>
                  <Button
                    variant="danger"
                    onClick={e => gotoLesson()}
                    className="mb-4"
                    style={{ width: '100%', fontFamily }}>Cancel</Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionForm;