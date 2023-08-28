import React from "react";
import styled from 'styled-components';
import { useState } from 'react';

export const GallerySection = ({ title, images, lang }) => {

    const [openPopup, setOpenPopup] = useState(false)
    const [choosenImageToOpen, setImage] = useState("")

    return (
        <div>
            <h2>{title}</h2>
            <Gallery>
                {images.map((el, i) => {
                    return (
                        <img onClick={() => (setOpenPopup(true), setImage(el.url))} key={i} src={el.url} alt="" />
                    )
                })}
            </Gallery>
            {openPopup ?
                <Pop onClick={() => setOpenPopup(false)} >
                    <img src={choosenImageToOpen} alt="" />
                    <span />
                </Pop>
                : null}
        </div>
    )
}


export const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    img {
        height: 100%;
        width: 100%;
        aspect-ratio: 1.5 / 1;
        object-fit: cover;
        cursor: pointer;
    }
    @media (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const Pop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    img {
        height: auto;
        max-height: 90vh;
        width: auto;
        max-width: 90vw;
        z-index: 10;
        cursor: pointer;
    }
    span {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 150%;
        background-color: black;
        opacity: 0.5;
    }
    @media (max-width: 650px) {
        img {
            max-width: 100vw;
            height: auto;
        }
    }
`
