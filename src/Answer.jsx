import React from "react"

export default function Answer(props) {

  const styles = {
    background: props.isHeld ? "#D6DBF5" : "white"
  }

  const checkedStyles = {
    background: props.isCorrect ? "#94D7A2" : props.isHeld && !props.isCorrect ? "#F8BCBC" : "white",
    opacity: props.isCorrect? "none" : 0.5
  }

  return (
    <button
      className="answer"
      style={props.isGoingToCheck ? checkedStyles : styles}
      onClick={() => props.clicked(props.questionId,props.id)}
      disabled = {props.isGoingToCheck ? true: false}
    >
    {props.value}
    </button>
  )
}
