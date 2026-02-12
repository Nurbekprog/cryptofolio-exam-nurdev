import { useNavigate } from 'react-router-dom'
import { Container } from '../../utils'
import WatchList from '../WatchList'
import CurrencySelect from '../CurrencySelect'
import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 0;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 640px) {
    justify-content: space-between;
  }

  @media (max-width: 360px) {
    gap: 8px;
  }
`;
 
const Logo = styled.h2`
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.15px;
  color: #87ceeb;
  cursor: pointer;
`

function Header() {
  const navigate = useNavigate()
  return (
         <Container>
          <HeaderWrapper>
            <Logo onClick={() => navigate("/")}>CRYPTOFOLIO</Logo>
            <Actions>
              <CurrencySelect />
              <WatchList />
            </Actions>
          </HeaderWrapper>
         </Container>
  )
}

export default Header
