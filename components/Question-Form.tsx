import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { ThemeContext, fontFamily } from '../pages/_app';
import { useContext, useState, FC } from 'react';
import { addQuestions } from '../helper';
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
  const [options, setOptions] = useState<Option[]>(_options);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();

  const goBack = () => {
    router.back()
  }

  const createQuestion = async (e: any) => {
    e.preventDefault();
    setShowSpinner(true)
    const newQuestion: QuestionSchema = {
      id: randomBytes(16).toString('hex'),
      correctAnswer: correctOption,
      options,
      question
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
    }
  }


  const { theme } = useContext(ThemeContext);
  const textColor = theme === 'dark' ? 'white' : 'black';
  const color = theme === 'dark' ? 'black' : 'white';
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Card bg={color}>
            <Card.Title className={`m-4 text-${textColor}`}>Add Question</Card.Title>

            <Card.Body>
              <div style={{ width: '100%' }}>
                <Card.Text className={`text-${textColor}`}>Whats your question</Card.Text>
                <textarea className={`bg-${theme} text-${textColor}`} style={{ width: '100%', height: '30vh' }}></textarea>
              </div>

              <h6 className={`text-${textColor}`}>Answers</h6>

              <Row>
                {options && options.map((option, index) => (
                  <Col key={index} sm={6}>
                    <Card className={`p-2 my-2 border border-primary rounded bg-${color}`}>
                      <Row>
                        <Col sm={10}>
                          <input value={option.answer} onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index].answer = e.target.value;
                            setOptions(newOptions)
                          }} style={{ width: '100%' }} placeholder='option 1' className={`p-4 border-0 bg-${color} text-${textColor}`} />
                        </Col>
                        <Col sm={2}>
                          <input type="checkbox" checked={option.isCorrect} onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index].isCorrect = !option.isCorrect;
                            if (!option?.isCorrect) {
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
                  onClick={e => goBack()}
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