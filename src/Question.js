import React from "react"

export default function Question(props){

    const answersElements = props.question.answers.map((element, index) => {    
        let bgColor = ''
        if(atob(element) === props.question.selected){
            bgColor = 'selected'
        }

        if((atob(element) === props.question.selected) && props.showAnswers) {
            bgColor = 'wrong'
        }
        if((atob(props.question.correctAnswer) === atob(element)) && props.showAnswers){
            bgColor = 'correct'
        } 

        return(
            <button className={bgColor} onClick={(event) => props.handleClickAnswer(event.target.id, event.target.value)} value={atob(element)} id={props.question.id} key={index}>{atob(element)}</button>
        )   
    })

   
    return(
        <div className="question-container">
            <h4>{atob(props.question.questionTitle)}</h4>
                <div className="options">
                    {answersElements}
                </div>
            <hr />
        </div>
    )
}