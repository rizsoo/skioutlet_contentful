import React from 'react'
import styled from 'styled-components';

const SmallSlider = ({ element, i, setSliderNum, sliderNum }) => {

    let isSameImage = (sliderNum > 20 ? 1 : Number(sliderNum)) === (i + 1);

    return (
        <Frame opacity={isSameImage}>
            <img onClick={() => setSliderNum(i + 1)} src={element} alt='' />
        </Frame>
    )
}

export const Frame = styled.div`
    img {
        opacity: ${props => props.opacity ? '1' : '0.5'};
    }
    @media (max-width: 650px) {
        max-width: calc(100% / 3.1);
    }
`

export default SmallSlider