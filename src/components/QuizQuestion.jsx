import React from "react";
import "./QuizQuestion.css";

export default function QuizQuestion({ question, answers }) {
  const allQuestions = [];

  question.forEach((question) =>
    allQuestions.push(
      <div className="question-container">
        <>{question}</>
        <div className="answers-list">
          <span className="answer">{answers[0]}</span>
          <span className="answer">{answers[1]}</span>
          <span className="answer">{answers[2]}</span>
          <span className="answer">{answers[3]}</span>
        </div>
      </div>
    )
  );
  return <div className="question-container">{allQuestions}</div>;
}
