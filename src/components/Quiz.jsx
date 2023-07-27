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
        // console.log(data.results);
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
          answers: [
            {
              answer: decode(question.correct_answer),
              isTrue: true,
              isSelected: true,
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
    // setQuestions((oldQuestions) =>
    //   oldQuestions.map((question) => {
    //     if (question.id === questionId) {
    //       question.map((answers) => {
    //         if (answers.id === answerId) {
    //           return { ...answers, isSelected: true };
    //         } else {
    //           return { ...answers, isSelected: false };
    //         }
    //       });
    //     } else {
    //       return { ...question };
    //     }
    //   })
    // );
    console.log("Question Id is:", questionId);
    console.log("answer Id is:", answerId);
  }

  function getFormattedQuestions() {
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) => {
        return (
          <QuizQuestion
            question={question.question}
            answers={question.answers}
            selectAnswer={selectAnswer}
            id={question.id}
            key={question.id}
          />
        );
      })
    );
  }

  //Building the quiz
  return (
    <div>
      {questions.length > 1 ? (
        <>
          {questions.map((theQuestion) => {
            console.log(theQuestion.question);
            return (
              <QuizQuestion
                question={theQuestion.question}
                answers={theQuestion.answers}
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
