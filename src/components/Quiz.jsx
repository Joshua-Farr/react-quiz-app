import React from "react";
import QuizQuestion from "./QuizQuestion";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [gameState, setGameState] = React.useState(true);
  const [userScore, setUserScore] = React.useState(0);
  const [questions, setQuestions] = React.useState({});

  //Fetching data on load
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
        console.log(data.results);
        getTheQuestions();
        console.log("use effect questions:", questions);
      });
  }, []);

  //Formatting returned data from API in to obj. array
  function getTheQuestions() {
    setQuestions((questionsList) =>
      questionsList.map((question) => {
        return {
          id: nanoid(),
          question: decode(question.question),
          answers: [
            {
              answer: question.correct_answer,
              isTrue: true,
              isSelected: false,
            },
            {
              answer: question.incorrect_answers[0],
              isTrue: false,
              isSelected: false,
            },
            {
              answer: question.incorrect_answers[1],
              isTrue: false,
              isSelected: false,
            },
            {
              answer: question.incorrect_answers[2],
              isTrue: false,
              isSelected: false,
            },
          ],
        };
      })
    );

    console.log(questions);
  }

  //Building the quiz
  return (
    <div>
      {questions.length > 1 ? (
        <>
          <QuizQuestion question={questions} />

          {gameState ? (
            <button
              onClick={() => {
                setGameState((oldState) => !oldState);
              }}
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={() => {
                setGameState((oldState) => !oldState);
              }}
            >
              Start New Game
            </button>
          )}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
