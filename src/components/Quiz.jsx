import React from "react";
import QuizQuestion from "./QuizQuestion";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import "./Quiz.css";

export default function Quiz() {
  const [gameState, setGameState] = React.useState(true);
  const [userScore, setUserScore] = React.useState(0);
  const [questions, setQuestions] = React.useState({});

  function startGame() {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data: ", data);
        isSelected: false, setQuestions(data.results);
        getTheQuestions();
      });
  }

  function shuffleQuestions() {
    setQuestions((oldQuestions) => {
      return oldQuestions.map((question) => {
        console.log("Checking: ", question.answers);
        //Preventing shuffling of True/False questions
        if (question.answers.length > 2) {
          const answers = question.answers.sort((a, b) => 0.5 - Math.random());
          console.log("shuffling...", answers);
          return { ...question, answers };
        } else {
          return { ...question };
        }
      });
    });
  }

  //Fetching data on initial load
  React.useEffect(() => {
    startGame();
  }, []);

  //Using to see what questions looks like after re-renders
  React.useEffect(() => {
    console.log("Updated Questions: ", questions);
  }, [questions]);

  //Formatting returned data from API in to obj. array
  function getTheQuestions() {
    setQuestions((questionsList) =>
      questionsList.map((question) => {
        if (question.type === "boolean") {
          return {
            question: decode(question.question),
            id: nanoid(),
            type: question.type,
            answers: [
              {
                answer: "True",
                isTrue: question.correct_answer === "True" ? true : false,
                isSelected: false,
                id: nanoid(),
              },
              {
                answer: "False",
                isTrue: question.correct_answer === "False" ? true : false,
                isSelected: false,
                id: nanoid(),
              },
            ],
          };
        } else {
          return {
            question: decode(question.question),
            id: nanoid(),
            type: question.type,
            answers: [
              {
                answer: decode(question.correct_answer),
                isTrue: true,
                isSelected: false,
                id: nanoid(),
              },
              {
                answer: decode(question.incorrect_answers[0]),
                isTrue: false,
                isSelected: false,
                id: nanoid(),
              },

              {
                answer: decode(question?.incorrect_answers[1]),
                isTrue: false,
                isSelected: false,
                id: nanoid(),
              },
              {
                answer: decode(question?.incorrect_answers[2]),
                isTrue: false,
                isSelected: false,
                id: nanoid(),
              },
            ],
          };
        }
      })
    );
    console.log("Calling the shuffle");
    shuffleQuestions();
  }

  //Logic for handling question selection and updating questions state
  function selectAnswer(questionId, answerId) {
    setQuestions((oldQuestions) => {
      return oldQuestions.map((question) => {
        if (question.id === questionId) {
          const answers = question.answers.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, isSelected: true };
            } else {
              return { ...answer, isSelected: false };
            }
          });
          return { ...question, answers };
        } else {
          return { ...question };
        }
      });
    });
  }

  //Goes through all answers and checks to see if they are correct
  function checkAnswers() {
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i]?.answers.length; i++) {
        if (
          questions[i].answers[j].isTrue &&
          questions[i].answers[j].isSelected
        ) {
          setUserScore((oldScore) => (oldScore += 1));
        }
      }
    }
  }

  //Building the quiz
  return (
    <div>
      {questions.length > 1 ? (
        <>
          {questions.map((theQuestion) => {
            return (
              <QuizQuestion
                question={theQuestion.question}
                answers={theQuestion.answers}
                selectAnswer={selectAnswer}
                type={theQuestion.type}
                key={theQuestion.id}
                id={theQuestion.id}
              />
            );
          })}

          {gameState ? (
            <button
              onClick={() => {
                setGameState((oldState) => !oldState);
                checkAnswers();
              }}
            >
              Check Answers
            </button>
          ) : (
            <div className="player-score">
              <h3>You scored {userScore}/5 correct answers!</h3>
              <button
                onClick={() => {
                  setGameState((oldState) => !oldState);
                  setUserScore(0);
                  startGame();
                }}
              >
                Start New Game
              </button>
            </div>
          )}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
