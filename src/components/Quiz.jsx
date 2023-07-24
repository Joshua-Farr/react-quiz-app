import React, { useReducer } from "react";
import QuizQuestion from "./QuizQuestion";
import {decode} from 'html-entities';
import { nanoid } from 'nanoid';


export default function Quiz(){

    const theQuiz = [
        {
            "category": "History",
            "type": "boolean",
            "difficulty": "medium",
            "question": "&quot;I disapprove of what you say, but I will defend to the death your right to say it&quot; is a quote from French philosopher Voltaire.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "category": "History",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What year did the Battle of Agincourt take place?",
            "correct_answer": "1415",
            "incorrect_answers": [
                "1463",
                "1401",
                "1422"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which game is NOT part of the Science Adventure series by 5pb. and Nitroplus?",
            "correct_answer": "Occultic; Nine",
            "incorrect_answers": [
                "Steins; Gate",
                "Robotics; Notes",
                "Chaos; Child"
            ]
        },
        {
            "category": "History",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In what year did the Berlin Wall fall?",
            "correct_answer": "1989",
            "incorrect_answers": [
                "1987",
                "1991",
                "1993"
            ]
        },
        {
            "category": "Mythology",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the name of the Greek god of peaceful deaths?",
            "correct_answer": "Thanatos",
            "incorrect_answers": [
                "Tartarus",
                "Hades",
                "Moros"
            ]
        }
    ]

    const theQuiz2 = [
        {
            "category": "History",
            "type": "boolean",
            "difficulty": "medium",
            "question": "THSIS IS A NEW QUIZ;I disapprove of what you say, but I will defend to the death your right to say it&quot; is a quote from French philosopher Voltaire.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "category": "History",
            "type": "multiple",
            "difficulty": "medium",
            "question": "THSIS IS A NEW QUIZf Agincourt take place?",
            "correct_answer": "1415",
            "incorrect_answers": [
                "1463",
                "1401",
                "1422"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "medium",
            "question": "WTHSIS IS A NEW QUIZience Adventure series by 5pb. and Nitroplus?",
            "correct_answer": "Occultic; Nine",
            "incorrect_answers": [
                "Steins; Gate",
                "Robotics; Notes",
                "Chaos; Child"
            ]
        },
        {
            "category": "History",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In what year did THSIS IS A NEW QUIZl?",
            "correct_answer": "1989",
            "incorrect_answers": [
                "1987",
                "1991",
                "1993"
            ]
        },
        {
            "category": "Mythology",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the name of THSIS IS A NEW QUIZ deaths?",
            "correct_answer": "Thanatos",
            "incorrect_answers": [
                "Tartarus",
                "Hades",
                "Moros"
            ]
        }
    ]



    const [quizQuestions, setQuizQuestions] = React.useState([])

    const [theQuizState, setTheQuizState] = React.useState(true)
    const [userScore, setUserScore] = React.useState(0)

    // React.useEffect( () => {
    //     console.log("Quiz state has changed!")
    // },[theQuizState])

    function newGame(){
        console.log("Starting a new game!")
        setUserScore(0)
        console.log("Resetting the user score!")
        setTheQuizState(true)
        console.log("Setting the user state to true!")
        console.log("The quiz state is:", theQuizState)
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
        .then(res => res.json())
        .then(data => {
            setQuizQuestions(data.results)
            console.log(data.results)
            console.log(theQuizState)
        })    
    }

    const [answers, setAnswers] = React.useState()

    React.useEffect( () =>{
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
        .then(res => res.json())
        .then(data => {
            setQuizQuestions(data.results)
            console.log(data.results)
            console.log(theQuizState)
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
        return answersArray
    }

    function checkAnswers(){
        console.log("checking anwers!")
        setTheQuizState(false)

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
                {/* {!theQuizState ?  
                <> */}
                    <h4 className="user-score">You got {userScore}/5 questions right!</h4>
                    <button onClick={newGame}>New Game</button>
                {/* </> : */}
                <button onClick={checkAnswers}>Check Answers</button>
        }
            </>
            : <p>loading...</p>}

            
        </div>
    )
}