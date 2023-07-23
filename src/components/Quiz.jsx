import React from "react";
import QuizQuestion from "./QuizQuestion";
import {decode} from 'html-entities';
import { nanoid } from 'nanoid';


export default function Quiz(){

    const [quizQuestions, setQuizQuestions] = React.useState([])
    // const [answers, setAnswers] = React.useState()

    React.useEffect( () =>{
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
        .then(res => res.json())
        .then(data => {
            setQuizQuestions(data.results)
            console.log(data.results)
        })
    },[])

 


    function getAnswers(answer, incorrectAnswers){
        
        if(incorrectAnswers.length === 1){
            return [
            {
                isAnswer: true,
                value: incorrectAnswers[0],
                isSelected: false,
                id: nanoid()
            }, 
            {
                isAnswer: false,
                value: answer,
                isSelected: false,
                id: nanoid()

            }]
        }

        let answersArray = []
        answersArray.push(
            {
                isAnswer: true,
                value: answer,
                isSelected: false,
                id: nanoid()

            })

        for(let i=0; i< incorrectAnswers.length; i++){
            answersArray.push({
                isAnswer: false,
                value:  incorrectAnswers[i],
                isSelected: false,
                id: nanoid()

            })
        }

        // Need to add shuffling algorithm
        // console.log(answersArray)
        return answersArray;
    }



    return(
        <div>
            {quizQuestions.length > 1 ? 
            <>      
                <QuizQuestion 
                    question={decode(quizQuestions[0].question)} 
                    answers={getAnswers(quizQuestions[0].correct_answer, quizQuestions[0].incorrect_answers)}

                /> 
                <QuizQuestion 
                    question={decode(quizQuestions[1].question)} 
                    answers={getAnswers(quizQuestions[1].correct_answer, quizQuestions[1].incorrect_answers)}

                /> 
                <QuizQuestion 
                    question={decode(quizQuestions[2].question)} 
                    answers={getAnswers(quizQuestions[2].correct_answer, quizQuestions[2].incorrect_answers)}

                /> 
                <QuizQuestion 
                    question={decode(quizQuestions[3].question)} 
                    answers={getAnswers(quizQuestions[3].correct_answer, quizQuestions[3].incorrect_answers)}
                /> 
                <QuizQuestion 
                    question={decode(quizQuestions[4].question)} 
                    answers={getAnswers(quizQuestions[4].correct_answer, quizQuestions[4].incorrect_answers)}

                /> 
            </>
            : <p>loading...</p>}
            <button>Check Answers</button>
        </div>
    )
}