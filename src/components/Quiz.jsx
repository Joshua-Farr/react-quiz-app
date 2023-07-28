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
        isSelected: false, setQuestions(data.results);
        console.log(data.results);
        getTheQuestions();
        // getFormattedQuestions();
      });
  }, []);

  //Using to see what questions looks like after re-renders
  React.useEffect(() => {
    console.log("Updated Questions: ", questions);
  }, [questions]);

  //Formatting returned data from API in to obj. array
  function getTheQuestions() {
    setQuestions((questionsList) =>
      questionsList.map((question) => {
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
      })
    );
  }

  function selectAnswer(questionId, answerId) {
    setQuestions((oldQuestions) => {
      return oldQuestions.map((question) => {
        if (question.id === questionId) {
          const answers = question.answers.map((answer) => {
            if (answer.id === answerId) {
              console.log("Matching answer: ", answer, " located!");
              console.log("New answer: ", { ...answer, isSelected: true });
              return { ...answer, isSelected: true };
            } else {
              return { ...answer, isSelected: false };
            }
          });
          console.log("Updated question obj: ", answers);
          return { ...question, answers };
        } else {
          return { ...question };
        }
      });
    });
    console.log("Question Id is:", questionId);
    console.log("answer Id is:", answerId);
  }

  //Building the quiz
  return (
    <div>
      {console.log("here is the questions array: ", questions)}
      {questions.length > 1 ? (
        <>
          {questions.map((theQuestion) => {
            // console.log("Accessing the question: ", theQuestion);
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
              }}
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={() => {
                setGameState((oldState) => !oldState);
                setUserScore(0);
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
