import React from "react";
import "./QuizQuestion.css";

export default function QuizQuestion({
  question,
  answers,
  id,
  selectAnswer,
  showCorrectAnswers,
  gameState,
}) {
  function figureOutColor(selected, answer) {
    if (answer && gameState === false) {
      return "hsla(133, 46%, 71%, 1)";
    } else if (selected && !answer && gameState === false) {
      return "hsla(360, 81%, 85%, 1)";
    } else if (selected && gameState === true) {
      return "hsla(230, 61%, 90%, 1)";
    } else {
      return "white";
    }
  }

  return (
    <div className="question-container">
      <>{question}</>
      <div className="answers-list">
        <span
          className="answer"
          onClick={() => selectAnswer(id, answers[0].id)}
          style={{
            backgroundColor: figureOutColor(
              answers[0].isSelected,
              answers[0].isTrue
            ),
          }}
        >
          {answers[0].answer}
        </span>
        <span
          className="answer"
          onClick={() => selectAnswer(id, answers[1].id)}
          style={{
            backgroundColor: figureOutColor(
              answers[1].isSelected,
              answers[1].isTrue
            ),
          }}
        >
          {answers[1].answer}
        </span>
        {answers.length > 2 ? (
          <>
            <span
              className="answer"
              onClick={() => selectAnswer(id, answers[2].id)}
              style={{
                backgroundColor: figureOutColor(
                  answers[2].isSelected,
                  answers[2].isTrue
                ),
              }}
            >
              {answers[2].answer}
            </span>
            <span
              className="answer"
              onClick={() => selectAnswer(id, answers[3].id)}
              style={{
                backgroundColor: figureOutColor(
                  answers[3].isSelected,
                  answers[3].isTrue
                ),
              }}
            >
              {answers[3].answer}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
