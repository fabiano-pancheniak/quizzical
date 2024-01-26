import './css/index.css'
import './css/quiz.css'
import React from 'react'
import { nanoid } from 'nanoid'
import Question from "./Question"
import yellowBlob from './css/yellow-blob.png';
import blueBlob from './css/blue-blob.png';

export default function Quiz(){
    const [questions, setQuestions] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [startNewGame, setStartNewGame] = React.useState(false)
    const [gameStarted, setGameStarted] = React.useState(false)
    const [gameEnded, setGameEnded] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    const shuffleAnswers = (arr) => arr.sort(() => Math.random() - 0.5)

    React.useEffect(() => {
        if(gameStarted){
            fetchQuestions()
        }
    }, [gameStarted, startNewGame])

    function fetchQuestions(){
        //Ajustar trycatch
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
        .then(response => response.json())
        .then(data => {
            let questionsArray = []
            data.results.forEach(question => {
                questionsArray.push({
                    id: nanoid(),
                    answers:shuffleAnswers([...question.incorrect_answers, question.correct_answer]),
                    questionTitle:question.question,
                    correctAnswer:question.correct_answer,
                    selected: null
                })
            })
            //Talvez não precisa do if
            //if(gameStarted){
                setQuestions(questionsArray)
                setIsLoading(false)    
            })
    }

        
    function handleClickAnswer(id, value){
        if(!gameEnded){
            setQuestions(prevQuestions => {
                let findQuestion = prevQuestions.find(questions => questions.id === id.toString())
                findQuestion.selected = value
                return (
                        [...prevQuestions] 
                    )
                })
        }
    }


    function handleCheckAnswer(){
        let allChecked = questions.every(checkQuestions)
                             
        function checkQuestions(questions) {
            return questions.selected != null;
            }
    
         if(allChecked){      
            let corrects = 0
            questions.forEach(element => {
                if(element.selected === atob(element.correctAnswer)){
                    corrects += 1
                } 
            })
                    
            setCorrectAnswers(corrects)
            setShowAnswers(true)
            setGameEnded(true)
    
        }
    }

    const questionElement = questions ? questions.map(question =>{
        return(
            <Question
                key={question.id}
                question={question}
                handleClickAnswer={handleClickAnswer}
                id={question.id}
                showAnswers={showAnswers}
            />
        )
    }) : []


    function newGame(){
        setStartNewGame(prevStatus => !prevStatus)
        setCorrectAnswers(0)
        setShowAnswers(false)
        setGameEnded(false)
        setIsLoading(true)
    }

    function startGame(){
        setGameStarted(true)
    }
            
    return(
        

            !gameStarted ? 
                <div className='container'>
                    <img className='yellow-blob' src={yellowBlob} alt="Logo" />
                    <img className='blue-blob' src={blueBlob} alt="Logo" />
                        <div className='start-container'>
                        <h1>Quizzical</h1>
                        <button className='check-btn start-btn' onClick={startGame}>Start Quiz</button> 
                        </div>
                </div>
                :
                isLoading ? <div className='container'><div className="loader"></div> </div>
                :
                <div className='container'>
                            <img className='yellow-blob' src={yellowBlob} alt="Logo" />
                            <img className='blue-blob' src={blueBlob} alt="Logo" />
                            <div className='quiz-container'>
                            <div className='btn-container'>
                            {questionElement}
                            <div className='results'>
                                {showAnswers && <h4>You scored {correctAnswers}/5 correct answers</h4>}
                                <button className='check-btn' onClick={showAnswers ? newGame : handleCheckAnswer}>{showAnswers ? 'Play again' : 'Check answers'}</button>
                            </div>
                        </div>
                    </div>
                </div>
           
    )    
}