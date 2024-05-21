/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Container, currencyType, formatNumber } from "../../utils";


const Wrapper = styled.div`
 .slick-prev,
 .slick-next {
    display: none !important;
 }
`;

const SliderS = styled(Slider)`
    display: flex;
    justify-content: space-around;
    padding-left: 150px;
`;

const SliderItem = styled.div`
    outline: none;
    max-width: 140px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
     img{
        margin: 10px auto;
     }
`;

const SliderTitle = styled.h4`
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 18.75px;
    text-align: center;
    text-transform: uppercase;
    span{
        margin-left: 7px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.15px;
    }
`;

const SliderPrice = styled.p`
font-family: Roboto, sans-serif;
font-size: 22px;
font-weight:500;
line-height: 25.6px;
text-align: center;
`

// eslint-disable-next-line react/prop-types
function Carousel({data}) {
    const navigate = useNavigate();
    const [type, setType] = useContext(DataContext)

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

     function handleNavigate(elID, el) {
        if(elID) {
            const storedData = JSON.parse(localStorage.getItem("watchList")) || [];
            const isExist = storedData.some((item) => item.id === elID);
            if(isExist) {
                navigate(`/crypto/${elID}`);
                return;
            }
            const updatedData = [...storedData, el];
            localStorage.setItem("watchList", JSON.stringify(updatedData));
            navigate(`/crypto/${elID}`);
        }
     }

  return (
    <Wrapper>
        <Container>
            <SliderS {...settings}>
                {
                    data.length > 0 && 
                    data.map((el, index) => {
                        let percent = Number(el.price_change_percentage_24h).toFixed(2);
                        return (
                            <SliderItem
                            key={index}
                            onClick={() => handleNavigate(el.id, el)}
                            >
                                <img width={80} height={80} src={el.image} alt="" />
                                <SliderTitle>
                                    {el.symbol}
                                    <span style={{color: percent >= 0 ? "#0ECB81" : "#ff0000"}}>
                                        {percent > 0 ? `+${percent}` : `${percent}`}% 
                                    </span>
                                </SliderTitle>
                                <SliderPrice>
                                  {currencyType(type)} {formatNumber(el.current_price.toFixed(2))}
                                </SliderPrice>
                            </SliderItem>
                        )
                    })
                }
            </SliderS>
        </Container>
    </Wrapper>
  )
}

export default Carousel