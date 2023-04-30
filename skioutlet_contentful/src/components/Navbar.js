import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { Link } from 'gatsby';
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { TiThMenu } from 'react-icons/ti'
import { HiOutlineLocationMarker } from 'react-icons/hi';
import logo from "../assets/skioutlet_logo_2020.png"

export const Navbar = ({ navbar, lang }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavBox>
            <MobileBtn>
                <TiThMenu onClick={() => setIsOpen(!isOpen)} />
                <Link to={lang.node_locale === "hu" ? "/" : "/en"}>
                    <h1><span style={{ color: "red" }}>ski</span>outlet.hu</h1>
                </Link>
            </MobileBtn>
            <NavContent isOpen={isOpen}>
                <Banner>
                    <Link to={lang.node_locale === "hu" ? "/" : "/en"}>
                        <img src={logo} />
                    </Link>
                    <Link to={"https://g.page/skioutlet?share"}>
                        <Location><HiOutlineLocationMarker /><p>1027 Budapest, Margit körút 46.</p></Location>
                    </Link>
                </Banner>
                <Nav>
                    <ul>
                        <span>
                            {navbar.elements.map((el, i) => {
                                return (
                                    <Link key={i} to={(lang.node_locale === "hu") ? `/${el.slug === "home" ? `` : `${el.slug}`}` : ((el.slug === "home") ? `/${el.node_locale}` : `/${el.node_locale}/${el.slug}`)}><NavElement active={el.title === lang.title}>{el.title}</NavElement></Link>
                                )
                            })}
                        </span>
                        <Socials>
                            <li key={5}><a href={'https://www.facebook.com/skioutletstore'} target='_blank'><BsFacebook /></a></li>
                            <li key={6}><a href={'https://www.instagram.com/skioutletbudapest'} target='_blank'><BsInstagram /></a></li>
                            <li key={7}><a href={'https://www.youtube.com/user/skioutlet'} target='_blank'><BsYoutube /></a></li>
                        </Socials>
                    </ul>
                </Nav>
            </NavContent>
        </NavBox>
    )
}

export const NavBox = styled.div`
    @media (min-width: 800px) {
        color: black;
    }
    position: relative;
    margin: 0 auto;
`
export const NavContent = styled.div`
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: start;
        gap: 30px;

        position: absolute;
        width: 100%;
        padding: 30px 15px;
        background-color: #ed2123;

        ${props => props.isOpen ? "transform: translateX(0)" : "transform: translateX(-100%)"};
        ${props => props.isOpen ? "opacity: 1" : "opacity: 0.9"};
        transition: all ease 0.5s;

        z-index: 100;
    }
    a {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 9px;
        h1 {
            font-size: 45px;
            margin-top: 7px !important;
        }
    }
    `
export const Banner = styled.div`
    padding: 10px 0;
    img {
        width: 90%;
        margin: 20px 0 12px 0px;
    }
    a {
        max-width: 900px;
        margin: 0 auto;
    }
    @media (max-width: 800px) {
        display: none;
    }
`
export const Nav = styled.div`
    background-color: #ed2123;
    display: flex;
    ul {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin: 0 auto;
        width: 100%;
        max-width: 900px;
        padding: 10px;
        text-transform: uppercase;
        span {
            display: flex;
            gap: 12px;
            margin-left: 3px;
            margin-right: 3px;
            @media (max-width: 650px) {
                margin: 10px 0;
                flex-direction: column;
                gap: 20px;
            }
        }
        @media (max-width: 800px) {
            flex-direction: column;
            gap: 13px;
        }
    }
    li {
        list-style-type: none;
        display: flex;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 1px;
        margin: 0;
        align-items: center;
        ${props => props.active ? "color: white;" : null};
        a {
            display: flex;
            transform: scale(1.3);
            margin-left: 2px;
        }
        @media (max-width: 800px) {
            font-size: 25px;
        }
        color: white;
        transition: all ease 0.15s;
    }

`
export const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 25px;
    font-weight: 700;
    svg {
        color: #A91111;
    }
    p {
        margin-bottom: 3px;
    }
`
export const NavElement = styled.li`
    list-style-type: none;
    display: flex;
    margin: 0;
    align-items: center;
    ${props => props.active ? "background-color: black !important;" : null};
    a {
        display: flex;
        transform: scale(1.3);
        margin-left: 2px;
    }
    @media (max-width: 800px) {
        font-size: 25px;
    }
    transition: all ease 0.15s;

`

export const MobileBtn = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    padding: 25px 20px 20px 20px;
    svg {
        color: black;
        transform: scale(2.3);
        padding: 1px;
        cursor: pointer;
        margin-right: 8px;
        margin-top: 3px;
    }    
    img {
        height: 44px;
    }
    a {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        gap: 6px;
        h1 {
            font-size: 40px;
            margin: 0 !important;
            line-height: 20px;
            font-weight: 800;
            color: black;
        }
    }
    @media (min-width: 800px) {
        display: none;
    }
`

export const Socials = styled.span`
    li {
        margin-left: 2px;
    }
    @media (max-width: 800px) {
        margin-top: 20px !important;
        flex-direction: row !important;
    }
`
