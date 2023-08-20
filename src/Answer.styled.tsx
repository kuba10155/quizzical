import styled from "styled-components";

interface StyledAnswerProps {
  isHeld: boolean;
  isCorrect: boolean;
}

const StyledAnswer = styled.div<StyledAnswerProps>`
  .heldAnswers {
    background: ${(props) => (props.isHeld ? "#D6DBF5" : "white")};
  }

  .checkingAnswers {
    background: ${(props) =>
      props.isCorrect
        ? "#94D7A2"
        : props.isHeld && !props.isCorrect
        ? "#F8BCBC"
        : "white"};
    opacity: ${(props) => (props.isCorrect ? 1 : 0.5)};
  }
`;

export default StyledAnswer;