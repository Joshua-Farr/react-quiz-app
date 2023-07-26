import React from "react";
import "./QuizQuestion.css";

export default function QuizQuestion({ question, answers, key }) {
  // const styles = {
  //   backgroundColor: isSelected ? "hsla(230, 61%, 90%, 1)" : "white",
  // };
  if (question !== undefined) {
    console.log("prop was passed");
  } else {
    console.log("prop was NOT passed");
  }

  return (
    <div className="question-container">
      <>{question}</>
      {/* <div className="answers-list">
        <span className="answer">{answers[0].answer}</span>
        <span className="answer">{answers[1].answer}</span>
        <span className="answer">{answers[2].answer}</span>
        <span className="answer">{answers[3].answer}</span>
      </div> */}
    </div>
  );
}
