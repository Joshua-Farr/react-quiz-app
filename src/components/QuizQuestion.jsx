import React from "react";
import "./QuizQuestion.css";

export default function QuizQuestion({ question, answers, id, selectAnswer }) {
  return (
    <div className="question-container">
      <>{question}</>
      <div className="answers-list">
        <span
          className="answer"
          onClick={() => selectAnswer(id, answers[0].id)}
          style={{
            backgroundColor: answers[0].isSelected
              ? "hsla(230, 61%, 90%, 1)"
              : "white",
          }}
        >
          {answers[0].answer}
        </span>
        <span
          className="answer"
          onClick={() => selectAnswer(id, answers[1].id)}
          style={{
            backgroundColor: answers[1].isSelected
              ? "hsla(230, 61%, 90%, 1)"
              : "white",
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
                backgroundColor: answers[2].isSelected
                  ? "hsla(230, 61%, 90%, 1)"
                  : "white",
              }}
            >
              {answers[2].answer}
            </span>
            <span
              className="answer"
              onClick={() => selectAnswer(id, answers[3].id)}
              style={{
                backgroundColor: answers[3].isSelected
                  ? "hsla(230, 61%, 90%, 1)"
                  : "white",
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
