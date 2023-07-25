import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const SectionSize = ({ tag, size, setSize, setPageNum }) => {

    const [isSizeAdded, setIsSizeAdded] = useState(false)

    let color = size.includes(tag) ? "#ed2123" : "white";
    let fontColor = size.includes(tag) ? "white" : "black";

    function handlePushSizeToArray(word) {
        !isSizeAdded ? setSize([...new Set([...size, word])]) : setSize(size.filter((item) => item !== word));
    }

    return (
        <SizeButton
            title={tag}
            style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
            onClick={() => {
                setPageNum(1);
                setIsSizeAdded(!isSizeAdded)
                handlePushSizeToArray(tag);
            }}>
            <p>{tag}</p>
        </SizeButton>
    )
}

export default SectionSize

export const SizeButton = styled.s`
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    width: fit-content;
    padding: 0 5px;
    position: relative; 
    text-decoration: none;
    p {
        margin: 0 !important;
        font-weight: bold;
        padding: 5px 0;
    }
    img {
      height: 30px;
      wifth: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
`

