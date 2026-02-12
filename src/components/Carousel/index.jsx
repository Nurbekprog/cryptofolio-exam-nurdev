/* eslint-disable react/prop-types */
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
  .slick-list {
    margin: 0 -8px;
  }

  .slick-slide > div {
    padding: 0 8px;
  }
`;

const SliderItem = styled.div`
  outline: none;
  min-height: 210px;
  border-radius: 14px;
  background: rgba(22, 23, 28, 0.65);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid rgba(135, 206, 235, 0.2);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(135, 206, 235, 0.5);
  }

  img{
    margin: 6px auto;
  }

  @media (max-width: 420px) {
    min-height: 186px;
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

    @media (max-width: 420px) {
      font-size: 14px;
      line-height: 1.2;
    }
`;

const SliderPrice = styled.p`
  font-family: Roboto, sans-serif;
  font-size: clamp(18px, 2.2vw, 22px);
  font-weight:500;
  line-height: 1.2;
  text-align: center;
`

function Carousel({data}) {
    const navigate = useNavigate();
    const [type] = useContext(DataContext)

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "14px",
            },
          },
        ],
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
                                <img width={64} height={64} src={el.image} alt="" />
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
