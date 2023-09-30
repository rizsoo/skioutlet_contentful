import React from 'react'
import styled from 'styled-components';

export const SupportersSection = ({ props }) => {
    console.log(props);
    return (
        <div>
            <h2>{props.title}</h2>
            <Elements>
                {props.elements.map(el => {
                    return (
                        <Elem href={el.short} target='_blank'>
                            <img alt="" src={el.image.url} />
                            {/* <p>{el.title}</p> */}
                        </Elem>
                    )
                })}
            </Elements>
        </div>
    )
}

export const Elements = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    @media (max-width: 650px) {
        flex-direction: column;
    }
`

export const Elem = styled.a`
    img {
        width: 200px;
        max-width: 100%;
    }
`