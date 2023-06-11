import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { FC } from 'react';
import { DeleteIcon } from "./svg/icons";
import { ThemeContext, fontFamily } from "../pages/_app";
import { useContext, useState, useRef } from "react";
import { Option, QuestionSchema } from "../types";
import { answerQuestion, removeQuestions } from "../helper";
import { useRouter } from 'next/router';

type QuestionProps = {
  question: QuestionSchema;
  lessonId: string
}

const Question: FC<QuestionProps> = ({
  question,
  lessonId
}) => {
  const { theme } = useContext(ThemeContext);
  const bgColor = theme === "light" ? "white" : "black";
  const textColor = theme === "light" ? "text-black" : "text-white";
  const [showSpinner, setShowSpinner2] = useState(false)
  const [showCorrectOption, updateShowCorrectOption] = useState(false)
  const [showWrongOption, updateShowWrongOption] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const router = useRouter();

  const submitQuestion = async (option: Option) => {
    setShowSpinner2(true)
    updateShowCorrectOption(false);
    try {
      const [result, err] = await answerQuestion({
        lessonId: lessonId,
        option,
        userId: localStorage.getItem('userId')!,
        questionId: question.id,
      })
      if (err) {
        console.log(err)
        if (err.includes('Max attempts reached')) {
          alert('Max attempts reached');
          updateShowCorrectOption(true);
        };
      }
      if (result) {
        console.log(result);
        if (!(option?.isCorrect)) {
          updateShowWrongOption(true)
        }
      }
    } catch (error: any) {
      console.log('incorrect');
      console.log(error);
    } finally {
      setShowSpinner2(false)
    }
  }

  const deleteQuestion = async (id: string) => {
    if (confirm('Do you want to delete this question')) {
      const [res, err] = await removeQuestions(
        [id],
        'LESSON',
        lessonId
      );
      if (!err && res) {
        alert("Deleted");
        router.reload();
      }
    }
  }


  const OptionComponent: FC<{ option: Option }> = ({
    option
  }) => {
    return (
      <Card onClick={e => {
        setSelectedOption(option)
        updateShowWrongOption(false);
        updateShowCorrectOption(false)
      }} bg={bgColor} className={`my-2 border ${textColor} 
      ${selectedOption && selectedOption.id === option.id ? 'border-success' : ''
        }
        ${showWrongOption && option.id === selectedOption?.id ? 'border-danger' : ''
        }
      ${showCorrectOption ?
          option.id === question.correctAnswer.id ?
            'border-success' :
            selectedOption?.id === option.id ?
              'border-danger' : '' : ''
        }
      rounded`}>
        <Card.Body>
          <Row>
            <Col xs={12}>
              <p className={`${textColor}`}>{option.answer}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Card
            bg={bgColor}
            className={`${textColor} border-0`}>
            <Container>
              <Card.Text className={`${textColor} mt-4`}>
                <span>{question.question}</span>
                <span style={{ cursor: 'pointer' }} onClick={() => deleteQuestion(question.id)} className='mx-2 ml-4'><DeleteIcon /></span>
              </Card.Text>
              <Row>
                <Col sm={6}>
                  <Card.Text className={`${textColor} my-4`}>Marks {question.marks}</Card.Text>
                </Col>
                <Col sm={6}>
                  <Card.Text className={`${textColor} my-4`}>Max Attempts: {question.maxAttempts}</Card.Text>
                </Col>
              </Row>
            </Container>

            <Row>
              {question.options && question.options.map((option, index) => (
                <Col xs={12} sm={6} key={index}>
                  <OptionComponent option={option} />
                </Col>
              ))}
            </Row>
            <Card.Footer className={`bg-${bgColor}`}>
              <Row>
                <Col xs={12}>
                  <Button
                    variant="primary"
                    className="mb-4"
                    style={{ width: '100%', fontFamily }}
                    onClick={() => { submitQuestion(selectedOption as Option) }}
                  >
                    {showSpinner && (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
                    {!showSpinner && 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Question;