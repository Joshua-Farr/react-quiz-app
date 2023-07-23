import React from "react";
import "./QuizQuestion.css"
import {decode} from 'html-entities';


export default function QuizQuestion({question, answers}){

    const [theAnswers, setTheAnswers] = React.useState(answers)
 
    React.useEffect( ()=>{
        
        console.log("here are the answers updated: ", theAnswers)
    },[theAnswers])

    const styles = {
        backgroundColor: "hsla(230, 61%, 90%, 1)"
    }

    function clicked(id){
        console.log("looking for id: ", id)
        setTheAnswers( prevAnswers => prevAnswers.map( answer => {
            return answer.id === id ?
            {...answer, isSelected: !answer.isSelected} :
            {...answer, isSelected: false}

        } ))

        console.log("Clicked on: ", id)
    }

    return(
        <div className="question-container">
            <>{question}</>
            <div className="answers-list">
                <span className="answer" onClick={() => clicked(answers[0].id)} 
                    style={{backgroundColor: theAnswers[0].isSelected ? "hsla(230, 61%, 90%, 1)" : "white"}}>
                    {decode(answers[0].value)} 
                </span>
                
                <span className="answer" onClick={() => clicked(answers[1].id)} 
                    style={{backgroundColor: theAnswers[1].isSelected ? "hsla(230, 61%, 90%, 1)" : "white"}}>
                    {decode(answers[1].value)} 
                </span>
                { answers.length > 2 ?
                <>
                    <span className="answer" onClick={() => clicked(answers[2].id)} 
                    style={{backgroundColor: theAnswers[2].isSelected ? "hsla(230, 61%, 90%, 1)" : "white"}}>
                            {decode(answers[2].value)}
                    </span>
                    <span className="answer" onClick={() => clicked(answers[3].id)} 
                        style={{backgroundColor: theAnswers[3].isSelected ? "hsla(230, 61%, 90%, 1)" : "white"}}>
                            {decode(answers[3].value)}
                    </span>
                </>
                : <></>}
            </div>
        </div>
    )


}