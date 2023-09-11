import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';

const SmallSlider = ({ number, prodBrand, setSliderNum, prodImg, sliderNum }) => {
    const [isImg, setImg] = useState(false)
    // Check for all the images
    const checkAllImage = (num) => {
        const img = new Image();
        img.src = `https://img.skioutlet.hu/product_images/${prodBrand}/${prodImg}${num > 1 ? `_${num}` : ''}.jpg`;

        img.onerror = () => {
            setImg(false);
        };

        img.onload = () => {
            setImg(true);
        };
    };
    checkAllImage(number)

    let isSameImage = sliderNum === number;

    return (
        <Frame opacity={isSameImage} isImg={isImg}>
            {isImg && <img onClick={() => setSliderNum(number)} src={`https://img.skioutlet.hu/product_images/${prodBrand}/${prodImg}${number > 1 ? `_${number}` : ''}.jpg`} alt='' />}
        </Frame>
    )
}

export const Frame = styled.div`
    max-width: calc(100% / 3.1);
    ${props => props.isImg ? '' : 'display: none;'}
    img {
        opacity: ${props => props.opacity ? '1' : '0.5'};
    }
`

export default SmallSlider