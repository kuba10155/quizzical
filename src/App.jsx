import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function App() {

  const [isStarted, setIsStarted] = React.useState(false)
  const [array, setArray] = React.useState([])

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
          answers: [{value: htmlDecode(item.correct_answer), id: nanoid(), isHeld: false}, {value: htmlDecode(item.incorrect_answers[0]), id: nanoid(), isHeld: false}, {value: htmlDecode(item.incorrect_answers[1]), id: nanoid(), isHeld: false}, {value: htmlDecode(item.incorrect_answers[2]), id: nanoid(), isHeld: false}],
          difficulty: item.difficulty,
          id: nanoid(),
          isHeld: false
        }))
        for (let item of notShuffled) {
          item.answers = item.answers.sort((a, b) => 0.5 - Math.random())
          console.log(item.answers)
        }
        const shuffled = notShuffled
        return shuffled
      }
      ))
  }, [])

  React.useEffect(() => {

  }, [array])


  function checkAnswers() {
    let count = 0
    array.map(item => {
      if(item.correctAnswer === item.answers.filter(answer => answer.isHeld)[0].value) {

        count++
      }
      console.log(item.correctAnswer)
    })
    console.log(count)
  }

  function start() {

    setIsStarted(true)
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
              } else if(checkedItem.id !== answerId){
                  return answer
                }
                else {
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

  /*function shuffleArray(arr) {
    console.log(array[0].answers)
    console.log(arr)
    arr.sort(() => Math.random() - 0.5);
    console.log(arr)
  }*/

  function quizElements() {
    console.log(array[0].answers)
    return array.map(item => {
      return (<Question
      key= {nanoid()}
      id= {item.id}
      category= {item.category}
      question= {item.question}
      answers={item.answers}
      difficulty= {item.difficulty}
      clicked={clicked}
      isHeld={item.isHeld}
      isCo
      />)
    })
  }

  return (
    <main>
      <div className="blob blob-top"></div>
      {!isStarted && <div className="container">
        <h1 className="title">Quizzical</h1>
        <p className="description">Some description if needed</p>
        <button className="start-quiz" onClick={start}>Start quiz</button>
      </div>}
      {isStarted && (array.length > 0) && <div className="center">{quizElements()}<button onClick={checkAnswers} className="start-quiz">Check Answers</button></div>}
      <div className="blob blob-bottom"></div>
    </main>
  )
}



/*
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
*/
