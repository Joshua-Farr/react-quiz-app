import React from "react";
import "./MainScreen.css"

export default function MainScreen(props){


    return(

        <div className="welcome-div">
            <h1>Quizzical</h1>
            <p>Test your trivia knowledge with this 5-question quiz!</p>
            <button onClick={props.startQuiz}>Start Quiz</button>
        </div>

    )
}