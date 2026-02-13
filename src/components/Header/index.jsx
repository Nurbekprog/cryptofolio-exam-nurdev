import { useNavigate } from "react-router-dom";
import { Container } from '../../utils'
import CurrencySelect from "../CurrencySelect";
import WatchList from "../WatchList";
import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
`;


const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
  height: 80px;

  @media (max-width: 640px) {
    padding: 12px 16px;
    height: auto;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  @media (max-width: 360px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px;
  }
`;

const LogoGroup = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.h2`
  font-family: var(--font-family-primary);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--text-primary);
  margin: 0;
  
  span {
    color: var(--accent-color);
  }

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    gap: 12px;
  }
  
  @media (max-width: 360px) {
    width: 100%;
    justify-content: center;
  }
`;

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoGroup onClick={() => navigate("/")}>
          <LogoText>CRYPTO<span>FOLIO</span></LogoText>
        </LogoGroup>

        <ActionsGroup>
          <CurrencySelect />
          <WatchList />
        </ActionsGroup>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
