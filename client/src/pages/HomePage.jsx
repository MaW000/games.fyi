import React from 'react'

import React from 'react';

const QUIZ_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/quiz';

export default function Quiz() {
  const [questions, setQuestions] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState([])
  useEffect(() => {
    const fetchData = async() => {
      let response = await fetch(QUIZ_API_BASE_URL);
      let jsonResponse = await response.json();
      setQuestions(jsonResponse)
    };
    fetchData()
  }, [])
  if (questions == null) return null
  const updateChosenAnswers = (questionIdx, answerIdx) => {
    let newChosenAnswer = [...currentAnswers];
    newChosenAnswer[questionIdx] = answerIdx;
    setCurrentAnswers(newChosenAnswer)
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  console.log(currentQuestion)
  return (
    <>
      <h1>{currentQuestion.question}</h1>
      {currentQuestion.answers.map((answer, answerIdx) => {
        const chosenAnswer = currentAnswers[currentQuestionIndex];
        const className = 'answer';
        if(chosenAnswer === answerIdx) {
          className += currentQuestion.correctAnswer === chosenAnswer ? ' correct' : ' incorrect';
        }

        return (
          <h2
            key={answer}
            className={className}
            onClick={() => {
              if (chosenAnswer != null) return;
              updateChosenAnswers(currentQuestionIndex, answerIdx);
            }}>
            {answer}
          </h2>
        );
      })}
      <button
        disabled={isFirstQuestion}
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex - 1)
        }}>
        Back
      </button>
      <button
        disabled={isLastQuestion || currentAnswers[currentQuestionIndex] == null}
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        }}
        >
      Next
      </button>
    </>
  );
}

export default HomePage;