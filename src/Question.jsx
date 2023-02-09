import React from "react"
import Answer from "./Answer"

export default function Question(props) {

  const answerElements = props.answers.map(answer => <Answer
    key={answer.id}
    clicked={props.clicked}
    questionId={props.id}
    value={answer.value}
    id={answer.id}
    isHeld={answer.isHeld}
    isGoingToCheck={props.isGoingToCheck}
    isCorrect={answer.isCorrect}
    />)

  return (
      <div className="solo">
        <h3 className="question">{props.question}</h3>
        <div className="answers">
          {answerElements}
        </div>
      </div>
  )
}
