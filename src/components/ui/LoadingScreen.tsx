import { useProgress } from "@react-three/drei";
import styled from "@emotion/styled";

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  z-index: 1000;
`;

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <LoadingWrapper>
      <div>Loading... {Math.round(progress)}%</div>
    </LoadingWrapper>
  );
};

export default LoadingScreen;
