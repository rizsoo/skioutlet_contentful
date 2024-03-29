import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

export const Footer = ({ footer, footer2, lang }) => {

    return (
        <div style={{ marginTop: "55px" }}>
            <FooterBox>
                <Content>
                    <List>
                        {/* <li className='comment' style={{ color: "white", fontSize: "13px", fontWeight: "500", marginBottom: "10px" }}>Egyéb</li> */}
                        {footer.elements.map((el, i) => {
                            return (
                                <Link key={i} to={lang.node_locale === "hu" ? `/${el.slug}` : `/${el.node_locale}/${el.slug}`} ><MenuElement >{el.title}</MenuElement></Link>
                            )
                        })}
                        <hr style={{ color: "white", margin: "15px 0 10px 0" }}></hr>
                        {footer2.elements.map((el, i) => {
                            return (
                                <Link style={{ fontSize: "12px", fontWeight: "200" }} key={i} to={lang.node_locale === "hu" ? `/${el.slug}` : `/${el.node_locale}/${el.slug}`} ><MenuElement >{el.title}</MenuElement></Link>
                            )
                        })}
                    </List>
                    <span>
                        <p>Created by Kristóf Fehér</p>
                        <p>COPYRIGHT © Lavina-Sport Kft.</p>
                    </span>
                </Content>
            </FooterBox>
        </div>
    )
}

export const FooterBox = styled.div`
    width: 100vw;
    height: 100%;
    padding: 35px 0;
    background-color: #ed2123;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        color: white;
        margin: 0;
    }
    span {
        text-align: right;
        @media (max-width: 650px) {
            text-align: center;
        }
        p {
            color: white;
            margin: 0;
            font-size: 13px;
        }
    }
`

export const Socials = styled.div`
    background-color: #1f1f1f;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 30px;
    padding: 15px;
    a {
        color: grey;
        transition: all ease 0.2s;
        &:hover {
            color: lightgrey;
        }
    }
    @media (max-width: 650px) {
        display: none;
    }
`

export const Content = styled.div`
    width: 900px;
    max-width: calc(100vw - 60px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 650px) {
        flex-direction: column;
        text-align: center;
        gap: 30px;
    }
`

export const List = styled.ul`
    color: white;
    margin: 0;
    li {
        list-style: none;
        margin: 0;
        font-weight: 700;
        letter-spacing: 1px;
    }
    a {
        font-size: 20px;
        text-transform: uppercase;
    }
    .comment {
        @media (max-width: 650px) {
            display: none;
        }
    }
`
export const MenuElement = styled.li`
    cursor: pointer;
`