import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "gatsby";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { HiOutlineLocationMarker } from "react-icons/hi";
import logo from "../assets/skioutlet_logo_2020.png";
import en from "../assets/img/en.png";
import hu from "../assets/img/hu.png";

export const Navbar = ({ navbar, lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: en,
      name: "English",
      country_code: "en",
    },
    {
      code: hu,
      name: "Magyar",
      country_code: "hu",
    },
  ];

  return (
    <NavBox>
      <MobileBtn>
        <TiThMenu onClick={() => setIsOpen(!isOpen)} />
        <Link to={lang.node_locale === "hu" ? "/" : "/en"}>
          <h1>
            <span style={{ color: "red" }}>ski</span>outlet.hu
          </h1>
        </Link>
      </MobileBtn>
      <NavContent isOpen={isOpen}>
        <Banner>
          <Link to={lang.node_locale === "hu" ? "/" : "/en"}>
            <img src={logo} />
          </Link>
          <a
            href={"https://g.page/skioutlet?share"}
            target="_blank"
            rel="noreferrer"
          >
            <Location>
              <HiOutlineLocationMarker />
              <p>1027 Budapest, Margit körút 46.</p>
            </Location>
          </a>
        </Banner>
        <Nav>
          <ul>
            <span>
              {navbar.elements.map((el, i) => {
                return (
                  <Link
                    key={i}
                    to={
                      lang.node_locale === "hu"
                        ? `/${el.slug === "home" ? `` : `${el.slug}`}`
                        : el.slug === "home"
                        ? `/${el.node_locale}`
                        : `/${el.node_locale}/${el.slug}`
                    }
                  >
                    <NavElement active={el.title === lang.title}>
                      {el.shortTitle ? el.shortTitle : el.title}
                    </NavElement>
                  </Link>
                );
              })}
            </span>
            <Socials>
              <li key={5}>
                <a
                  href={"https://www.facebook.com/skioutletstore"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFacebook />
                </a>
              </li>
              <li key={6}>
                <a
                  href={"https://www.instagram.com/skioutletbudapest"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsInstagram />
                </a>
              </li>
              <li key={7}>
                <a
                  href={"https://www.youtube.com/user/skioutlet"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsYoutube />
                </a>
              </li>
              <Flag>
                {languages
                  .filter((el) => el.country_code !== lang.node_locale)
                  .map(({ code, name, country_code }) => (
                    <Link
                      key={name}
                      to={
                        lang.slug === "home" && lang.node_locale === "en"
                          ? "/"
                          : lang.slug === "home"
                          ? `/${country_code}`
                          : lang.node_locale === "en"
                          ? `/${lang.slug}`
                          : `/${country_code}/${lang.slug}`
                      }
                    >
                      <img src={code} alt="" key={code} />
                    </Link>
                  ))}
              </Flag>
            </Socials>
          </ul>
        </Nav>
      </NavContent>
    </NavBox>
  );
};

export const NavBox = styled.div`
  @media (min-width: 800px) {
    color: black;
  }
  position: relative;
  margin: 0 auto;
`;
export const NavContent = styled.div`
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: start;
    gap: 30px;

    position: absolute;
    width: 100%;
    padding: 30px 15px;
    background-color: #ed2123;

    ${(props) =>
      props.isOpen
        ? "transform: translateX(0)"
        : "transform: translateX(-100%)"};
    ${(props) => (props.isOpen ? "opacity: 1" : "opacity: 0.9")};
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
`;
export const Banner = styled.div`
  padding: 10px 0;
  img {
    width: 90%;
    margin: 20px 0 12px 0px;
  }
  a {
    max-width: 940px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;
export const Nav = styled.div`
  background-color: #ed2123;
  display: flex;
  ul {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin: 0 auto;
    width: 100%;
    max-width: 940px;
    padding: 10px 0;
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
    ${(props) => (props.active ? "color: white;" : null)};
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
`;
export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 25px;
  font-weight: 700;
  svg {
    color: #a91111;
  }
  p {
    margin-bottom: 3px;
  }
`;
export const NavElement = styled.li`
  list-style-type: none;
  display: flex;
  margin: 0;
  align-items: center;
  ${(props) => (props.active ? "background-color: black !important;" : null)};
  a {
    display: flex;
    transform: scale(1.3);
    margin-left: 2px;
  }
  @media (max-width: 800px) {
    font-size: 25px;
  }
  transition: all ease 0.15s;
`;

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
`;

export const Socials = styled.span`
  li {
    margin-left: 2px;
  }
  @media (max-width: 800px) {
    margin-top: 20px !important;
    flex-direction: row !important;
  }
`;

export const Flag = styled.div`
  display: flex;
  align-items: center;
  transition: all ease-in-out 0.3s;
  background-color: white;
  border-radius: 15px;
  padding: 2.3px;
  img {
    width: 24px;
    height: 24px;
    min-width: 24px !important;
    cursor: pointer;
    z-index: 5;
    transition: all ease-in-out 0.1s;
  }
  a {
    display: flex;
  }
  img:hover {
    z-index: 15;
  }
  @media (max-width: 650px) {
    img {
      width: 35px;
      height: 35px;
      min-width: 35px !important;
    }
  }
`;
