import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function App() {

  const [isStarted, setIsStarted] = React.useState(false)
  const [array, setArray] = React.useState([])
  const [isGoingToCheck, setIsGoingToCheck] = React.useState(false)
  const [needRestart, setNeedRestart] = React.useState(false)

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setArray(() => {
        const notShuffled = data.results.map(item => ({
          category: item.category,
          question: htmlDecode(item.question),
          correctAnswer: htmlDecode(item.correct_answer),
          answers: [{value: htmlDecode(item.correct_answer), id: nanoid(), isHeld: false, isCorrect: true},
            {value: htmlDecode(item.incorrect_answers[0]), id: nanoid(), isHeld: false, isCorrect: false},
            {value: htmlDecode(item.incorrect_answers[1]), id: nanoid(), isHeld: false, isCorrect: false},
            {value: htmlDecode(item.incorrect_answers[2]), id: nanoid(), isHeld: false, isCorrect: false}],
          difficulty: item.difficulty,
          id: nanoid(),
          isHeld: false
        }))
        for (let item of notShuffled) {
          item.answers = item.answers.sort((a, b) => 0.5 - Math.random())
        }
        const shuffled = notShuffled
        return shuffled
      }
      ))
  }, [needRestart])

  function checkAnswers() {
    let count = 0
    array.map(item => {
      if(item.answers.filter(answer => answer.isHeld).length > 0){
        if(item.correctAnswer === item.answers.filter(answer => answer.isHeld)[0].value) {
          count++
        }
      }

    })
    return count
  }

  function newGame() {
    setArray([])
    setIsGoingToCheck(false)
    setNeedRestart(true)
    setIsStarted(false)
  }

  function clicked(questionId, answerId) {
    setArray(prevArray => prevArray.map(item => {
        if (item.id === questionId && item.answers.every(answer => answer.isHeld === false)) {
          let newArray = item.answers.map(answer => {
            if (answer.id === answerId) {
              return ({
                ...answer,
                isHeld: !answer.isHeld
              })
            } else {
                return answer
              }
            })
          return ({
            ...item,
            answers: newArray
          })
        } else if(item.id === questionId && item.answers.filter(answer => answer.isHeld === true).length!=0) {
          let checkedItem = item.answers.filter(answer => answer.isHeld === true)[0]
            let newArray = item.answers.map(answer => {
              if (answer.id === checkedItem.id) {
                return ({
                  ...answer,
                  isHeld: !answer.isHeld
                })
              } else {
                  return answer
                }
            })
            return ({
              ...item,
              answers: newArray
            })
          } else {
              return item
            }
    }))
  }

  const quizElements = array.map(item => {
      return (<Question
      key= {nanoid()}
      id= {item.id}
      category= {item.category}
      question= {item.question}
      answers={item.answers}
      difficulty= {item.difficulty}
      clicked={clicked}
      isHeld={item.isHeld}
      isGoingToCheck={isGoingToCheck}
      />)
    })

  return (
    <main>
      <div className="blob blob-top"></div>
      {!isStarted && <div className="container">
        <h1 className="title">Quizzical</h1>
        <p className="description">Some description if needed</p>
        <button className="start-quiz" onClick={() => setIsStarted(true)}>Start quiz</button>
      </div>}
      {isStarted && (array.length > 0) && <h1 className="main-title">QUIZZICAL</h1>}
      {isStarted && (array.length > 0) &&
        <div className="center">
          {quizElements}
          <div className="end-state">
            {
            isGoingToCheck &&
            <h2 className="score">
              You scored {checkAnswers()}/5 correct answers
            </h2>
            }
            <button
              onClick={isGoingToCheck ? () => newGame() : () => setIsGoingToCheck(true)}
              className="start-quiz"
            >{isGoingToCheck ? "Play again" : "Check Answers"}
            </button>
          </div>
        </div>}
      <div className="blob blob-bottom"></div>
    </main>
  )
}
