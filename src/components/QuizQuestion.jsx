import React from "react";


export default function QuizQuestion(props){


    return(
        <container className="question-container">
            <h4>How would one say goodbye in Spanish?</h4>
            <h4>pizza </h4>
            <div className="answers-list">
                <span className="answer">Adiós</span>
                <span className="answer">Hola</span>
                <span className="answer">Au Revoir</span>
                <span className="answer">Salir</span>
            </div>
        </container>

    )
}