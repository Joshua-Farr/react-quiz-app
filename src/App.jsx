import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainScreen from './components/MainScreen'
import Quiz from './components/Quiz'

//https://opentdb.com/api.php?amount=5


export default function App() {


  const [welcomeScreen, setWelcomeScreen] = useState(true)

  function startQuiz(){
    setWelcomeScreen(false);
  }

  return(
  <main>
    {welcomeScreen ? <MainScreen startQuiz={startQuiz}/> :  <Quiz />}


  </main>)
}

