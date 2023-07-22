import React from "react";
import "./QuizQuestion.css"
import {decode} from 'html-entities';


export default function QuizQuestion({question, answers}){


    return(
        <div className="question-container">
            <>{question}</>
            <div className="answers-list">
                <span className="answer">{decode(answers[0])}</span>
                <span className="answer">{decode(answers[1])}</span>
                { answers.length > 2 ?
                <>
                    <span className="answer">{decode(answers[2])}</span>
                    <span className="answer">{decode(answers[3])}</span>
                </>
                : <></>}
            </div>
        </div>
    )


}