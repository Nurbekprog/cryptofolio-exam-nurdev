import { useNavigate } from 'react-router-dom'
import { Container } from '../../utils'
import WatchList from '../WatchList'
import CurrencySelect from '../CurrencySelect'
import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          `;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
 
const Logo = styled.h2`
font-size: 20px;
font-weight: 700;
line-height: 32px;
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