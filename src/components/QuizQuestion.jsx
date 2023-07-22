import React from "react";
import "./QuizQuestion.css"

export default function QuizQuestion({question, answers}){


    return(
        <div className="question-container">
            <h4 className="question">{question}</h4>
            <div className="answers-list">
                <span className="answer">{answers[0]}</span>
                <span className="answer">{answers[1]}</span>
                <span className="answer">{answers[2]}Revoir</span>
                <span className="answer">{answers[3]}</span>
            </div>
        </div>

    )



    QuizQuestion.defaultProps = {
        answers: ["test","test","test","test","test"]
      }
}