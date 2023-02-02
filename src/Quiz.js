import './css/index.css'
import './css/quiz.css'
import Question from './Question'

export default function Quiz(){
    return(
        <div className='quiz-container'>
            <Question />
            <Question />
            <Question />
            <Question />
            <Question />
            <div className='btn-container'>
                <button className='check-btn'>Check answers</button>
            </div>
        </div>
    )
}