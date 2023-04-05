import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
    const [showControls, setShowControls] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(0)
    const listRef = useRef()

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if (direction === "left" && sliderPosition > 0) {
            listRef.current.style.transform = `translateX(${270 + distance}px)`
            setSliderPosition(sliderPosition - 1)
        }
        if (direction === "right" && sliderPosition < 5) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
            setSliderPosition(sliderPosition + 1)
        }
    }

    return (
        <Container className="d-flex flex-column"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!(showControls && title!=="My PlayList") ? "none" : ""} d-flex justify-content-center align-items-center`}>
                    <AiOutlineLeft onClick={() => handleDirection("left")} />
                </div>
                <div className={`d-flex slider ${title==="My PlayList" ? "flex-wrap" : "max-content"}`} ref={listRef}>
                    {
                        data?.map((movie, pos) => {
                            return (
                                <Card movieData={movie} isLiked={title==="My PlayList" ? true : false} index={pos} key={movie.id} />
                            )
                        })
                    }
                </div>
                <div className={`slider-action right ${!(showControls && title!=="My PlayList") ? "none" : ""} d-flex justify-content-center align-items-center`}>
                    <AiOutlineRight onClick={() => handleDirection("right")} />
                </div>
            </div>
        </Container>
    )
})
const Container = styled.div`
    gap:1rem;
    position:relative;
    padding:2rem 0;
    h1{
        margin-left:50px;
    }
    .wrapper{
        .slider{            
            gap:1rem;
            transform:translateX(0px);
            transition:0.3s ease-in-out;
            margin-left:50px;
        }
        .slider-action{
            position:absolute;
            z-index:99;
            height:100%;
            top:0;
            bottom:0;
            width:50px;
            transition:0.3s ease-in-out;
            svg{
                font-size:2rem;
            }
        }
        .none{
            display:none;
        }
        .left{
            left:0;
            top:1rem;
        }
        .right{
            right:0;
            top:1rem;
        }
    }
`;

