import styled from "@emotion/styled";
import useGameStore from "../../store/gameStore";

const UIContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 100;
  pointer-events: none;
`;

const ScoreBoard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  pointer-events: auto;
`;

const Button = styled.button`
  background: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #34495e;
  }
`;

const GameUI = () => {
  const { score, gameMode, matchFormat, isPlaying, startMatch, endMatch } =
    useGameStore();

  return (
    <>
      <UIContainer>
        <ScoreBoard>
          <h2>
            Score: {score.runs}/{score.wickets}
          </h2>
          <p>
            Overs: {score.overs}.{score.balls}
          </p>
          {matchFormat && <p>Format: {matchFormat}</p>}
          {gameMode && <p>Mode: {gameMode}</p>}
        </ScoreBoard>
      </UIContainer>

      <Controls>
        {!isPlaying ? (
          <Button onClick={() => startMatch()}>Start Match</Button>
        ) : (
          <Button onClick={() => endMatch()}>End Match</Button>
        )}
      </Controls>
    </>
  );
};

export default GameUI;
