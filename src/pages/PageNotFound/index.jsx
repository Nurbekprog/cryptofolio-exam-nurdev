import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-primary);
  color: var(--text-primary);
`;

const AppContainer = styled.div`
  text-align: center;
`;

const ErrorCode = styled.div`
  font-size: 150px;
  color: var(--accent-color);
  font-weight: 700;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
  
  @media (max-width: 420px) {
    font-size: 80px;
  }
`;

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Text = styled.div`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 32px;
  font-family: var(--font-family-secondary);
  
  span {
    color: var(--success-color);
    animation: ${blink} 1s infinite;
    margin-left: 4px;
  }

  @media (max-width: 420px) {
    font-size: 24px;
  }
`;

const BackButton = styled.button`
  padding: 12px 32px;
  background-color: var(--accent-color);
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: var(--font-family-primary);

  &:hover {
    background-color: var(--accent-hover);
  }
`;

function PageNotFound() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/`)
    }
  return (
    <AppWrapper>
        <AppContainer>
		<ErrorCode>404</ErrorCode>
		<Text>
			Not Found<span>_</span>
		</Text>

        <BackButton onClick={handleClick}>Go Back</BackButton>
	</AppContainer>
    </AppWrapper>
    
  )
}

export default PageNotFound