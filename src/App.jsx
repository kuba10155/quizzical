import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [array, setArray] = useState([]);
  const [isGoingToCheck, setIsGoingToCheck] = useState(false);
  const [needRestart, setNeedRestart] = useState(false);

  const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const shuffledQuestions = data.results.map((item) => {
          const answers = [
            {
              value: htmlDecode(item.correct_answer),
              id: nanoid(),
              isHeld: false,
              isCorrect: true,
            },
            ...item.incorrect_answers.map((incorrectAnswer) => ({
              value: htmlDecode(incorrectAnswer),
              id: nanoid(),
              isHeld: false,
              isCorrect: false,
            })),
          ];

          const shuffledAnswers = answers.sort(() => 0.5 - Math.random());
          return {
            category: item.category,
            question: htmlDecode(item.question),
            correctAnswer: htmlDecode(item.correct_answer),
            answers: shuffledAnswers,
            difficulty: item.difficulty,
            id: nanoid(),
            isHeld: false,
          };
        });
        setArray(shuffledQuestions);
      });
  }, [needRestart]);

  const checkAnswers = () => {
    let count = 0;
    array.map((item) => {
      if (item.answers.filter((answer) => answer.isHeld).length > 0) {
        if (
          item.correctAnswer ===
          item.answers.filter((answer) => answer.isHeld)[0].value
        ) {
          count++;
        }
      }
    });
    return count;
  };

  const newGame = () => {
    setArray([]);
    setIsGoingToCheck(false);
    setNeedRestart(true);
    setIsStarted(false);
  };

  const clicked = (questionId, answerId) => {
    setArray((prevArray) =>
      prevArray.map((item) => {
        if (item.id !== questionId) {
          return item;
        }

        const heldAnswers = item.answers.filter((answer) => answer.isHeld);

        if (heldAnswers.length === 0 || heldAnswers[0].id === answerId) {
          const updatedAnswers = item.answers.map((answer) => ({
            ...answer,
            isHeld: answer.id === answerId ? !answer.isHeld : false,
          }));

          return {
            ...item,
            answers: updatedAnswers,
          };
        }

        return item;
      })
    );
  };

  const quizElements = array.map((item) => (
    <Question
      key={nanoid()}
      id={item.id}
      category={item.category}
      question={item.question}
      answers={item.answers}
      difficulty={item.difficulty}
      clicked={clicked}
      isHeld={item.isHeld}
      isGoingToCheck={isGoingToCheck}
    />
  ));
  return (
    <main>
      <div className="blob blob-top"></div>
      {isStarted && array.length > 0 ? (
        <>
          <h1 className="main-title">QUIZZICAL</h1>
          <div className="center">
            {quizElements}
            <div className="end-state">
              {isGoingToCheck && (
                <h2 className="score">
                  You scored {checkAnswers()}/5 correct answers
                </h2>
              )}
              <button
                onClick={
                  isGoingToCheck ? newGame : () => setIsGoingToCheck(true)
                }
                className="start-quiz"
              >
                {isGoingToCheck ? "Play again" : "Check Answers"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <h1 className="title">Quizzical</h1>
          <p className="description">Some description if needed</p>
          <button className="start-quiz" onClick={() => setIsStarted(true)}>
            Start quiz
          </button>
        </div>
      )}
      <div className="blob blob-bottom"></div>
    </main>
  );
};

export default App;
