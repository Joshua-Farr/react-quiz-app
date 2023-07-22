import React from "react";
import QuizQuestion from "./QuizQuestion";

export default function Quiz(){

    const [quizQuestions, setQuizQuestions] = React.useState([])
    const tempAnswers = [1,2,3,4,5]

    React.useEffect( () =>{
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
        .then(res => res.json())
        .then(data => {
            setQuizQuestions(data.results)
            console.log("first question:", quizQuestions[0].question)
        })
    },[])


    return(
        <div>
            {/* <QuizQuestion question={quizQuestions[0].question} answers={tempAnswers}/> */}
            <button onClick={( ) => console.log("Clicked!")}>Check Answers</button>
        </div>
    )
}