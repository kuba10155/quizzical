import React from "react";
import StyledAnswer from "./Answer.styled";

interface AnswerProps {
  isGoingToCheck: boolean;
  questionId: string;
  id: string;
  clicked: (questionId: string, answerId: string) => void;
  value: string;
  isHeld: boolean;
  isCorrect: boolean;
}

const Answer: React.FC<AnswerProps> = ({
  isGoingToCheck,
  questionId,
  id,
  clicked,
  value,
  isHeld,
  isCorrect,
}) => (
  <StyledAnswer isHeld={isHeld} isCorrect={isCorrect}>
    <button
      className={`answer ${
        isGoingToCheck ? "checkingAnswers" : "heldAnswers"
      }`}
      onClick={() => clicked(questionId, id)}
      disabled={isGoingToCheck}
    >
      {value}
    </button>
  </StyledAnswer>
);

export default Answer;