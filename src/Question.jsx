import React from "react"

export default function Question(props) {

console.log(props.answers)

  return (
      <div className="solo">
        <h3 className="question">{props.question}</h3>
        <div className="answers">
          <button className="answer" style={{background: props.answers[0].isHeld ? "#D6DBF5" : "white"}} onClick={() => props.clicked(props.id,props.answers[0].id)}>{props.answers[0].value}</button>
          <button className="answer" style={{background: props.answers[1].isHeld ? "#D6DBF5" : "white"}} onClick={() => props.clicked(props.id,props.answers[1].id)}>{props.answers[1].value}</button>
          <button className="answer" style={{background: props.answers[2].isHeld ? "#D6DBF5" : "white"}} onClick={() => props.clicked(props.id,props.answers[2].id)}>{props.answers[2].value}</button>
          <button className="answer" style={{background: props.answers[3].isHeld ? "#D6DBF5" : "white"}} onClick={() => props.clicked(props.id,props.answers[3].id)}>{props.answers[3].value}</button>
        </div>
      </div>
  )
}

// <p>{props.difficulty}</p> <p>{props.category}</p>
