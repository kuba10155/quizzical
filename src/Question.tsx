import React from "react";
import Answer from "./Answer";

interface QuestionProps {
  id: string;
  question: string;
  answers: Array<{
    id: string;
    value: string;
    isHeld: boolean;
    isCorrect: boolean;
  }>;
  clicked: (questionId: string, answerId: string) => void;
  isGoingToCheck: boolean;
}

const Question: React.FC<QuestionProps> = ({
  id,
  question,
  answers,
  clicked,
  isGoingToCheck,
}) => (
  <div className="question-container">
    <h3 className="question">{question}</h3>
    <div className="answers">
      {answers.map((answer) => (
        <Answer
          key={answer.id}
          isGoingToCheck={isGoingToCheck}
          questionId={id}
          id={answer.id}
          clicked={clicked}
          value={answer.value}
          isHeld={answer.isHeld}
          isCorrect={answer.isCorrect}
        />
      ))}
    </div>
  </div>
);

export default Question;