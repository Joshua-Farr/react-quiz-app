import React from "react";
import QuizQuestion from "./QuizQuestion";
import {decode} from 'html-entities';

export default function Quiz(){

    const [quizQuestions, setQuizQuestions] = React.useState([])

    React.useEffect( () =>{
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
        .then(res => res.json())
        .then(data => {
            setQuizQuestions(data.results)
        })
    },[])

    

    function getAnswers(answer, incorrectAnswers){
        
        if(incorrectAnswers.length === 1){
            return ["True", "False"]
        }

        let answersArray = []
        answersArray.push(answer)

        for(let i=0; i< incorrectAnswers.length; i++){
            answersArray.push(incorrectAnswers[i])
        }
        
        console.log(answersArray)
        return answersArray;
        // shuffling algorithm
    }


    // getAnswers("12", ["1","2","3","4"])

      return(
        <div>
            {quizQuestions.length > 1 ? 
            <>
            
            <QuizQuestion question={decode(quizQuestions[0].question)} answers={getAnswers(quizQuestions[0].correct_answer, quizQuestions[0].incorrect_answers)}/> 
            <QuizQuestion question={decode(quizQuestions[1].question)} answers={getAnswers(quizQuestions[1].correct_answer, quizQuestions[1].incorrect_answers)}/> 
            <QuizQuestion question={decode(quizQuestions[2].question)} answers={getAnswers(quizQuestions[2].correct_answer, quizQuestions[2].incorrect_answers)}/> 
            <QuizQuestion question={decode(quizQuestions[3].question)} answers={getAnswers(quizQuestions[3].correct_answer, quizQuestions[3].incorrect_answers)}/> 
            <QuizQuestion question={decode(quizQuestions[4].question)} answers={getAnswers(quizQuestions[4].correct_answer, quizQuestions[4].incorrect_answers)}/> 
            </>
            : <p>loading...</p>}
            <button>Check Answers</button>
        </div>
    )
}