import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NewsList = ({ props, lang }) => {

    return (
        <>
            <CurrentRace>
                {[props[0]].map((el, i) => {
                    return (
                        <Link key={i} to={lang.node_locale === "hu" ? `/${el.slug}` : `/en/${el.slug}`}>
                            <CurrentRaceItem>
                                <img src={el.image.url} />
                                <VItemText>
                                    <h3 style={{ color: "#ed2123" }}>{lang.node_locale === "hu" ? "Legfrissebb!" : "Most recent!"}</h3>
                                    <EventTitle>{el.title}</EventTitle>
                                    {el.shortContext && <p>{el.shortContext.shortContext}</p>}
                                </VItemText>
                            </CurrentRaceItem>
                        </Link>
                    )
                })}
            </CurrentRace>
            <VItems>
                {props.map((el, i) => {
                    return (
                        <Link key={i} to={lang.node_locale === "hu" ? `/${el.slug}` : `/en/${el.slug}`}>
                            <VItem >
                                <img src={el.image.url} />
                                <SmallItemText>
                                    <EventTitle>{el.title}</EventTitle>
                                    {el.shortContext && <p>{el.shortContext.shortContext}</p>}
                                </SmallItemText>
                            </VItem>
                        </Link>
                    )
                })}
            </VItems>
        </>
    )
}
const CurrentRace = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 100rem;
  a {
    width: 100%;
  }
  h4 {
    color: #242424;
  }
  p {
    font-size: 14px;
    color: black;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const CurrentRaceItem = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    margin: 20px 0 30px 0;
    font-size: 1.2em;
    color: steelblue;
    text-decoration: none;
    box-sizing: border-box;
    border-radius: 8px;

    overflow: hidden;

    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;

    img {
        min-height: 180px !important;
        object-fit: cover;
    }
    ion-icon {
        color: #6d6d6d;
        font-size: 18px;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        img {
        max-height: 110px !important;
        }
    }
    @media (min-width: 800px) {
        height: 250px;
        width: 100%;
        img {
            max-width: 450px;
            width: 100%;
        }
    }
`

const VItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 100rem;
  h4 {
    color: #242424;
  }
  p {
    font-size: 14px;
    color: black;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
  a {
    @media (min-width: 800px) {
        height: auto;
        width: calc(100% / 4 - 12px);
    }
  }
`
const VItem = styled.div`
  display: grid;
  align-content: flex-start;
  height: 100%;

  border-radius: 8px;
  margin: 0;
  font-size: 1.2em;
  color: steelblue;
  text-decoration: none;
  box-sizing: border-box;
  
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  img {
    min-width: 100%;
    min-height: 180px !important;
    object-fit: cover;
  }
  ion-icon {
    color: #6d6d6d;
    font-size: 18px;
  }
  @media (max-width: 800px) {
    img {
      max-height: 110px !important;
    }
  }
`
const VItemText = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  gap: 10px;
  height: 100%;
  background-color: white;

  position: relative;
`
const SmallItemText = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  gap: 10px;
  height: 100%;
  background-color: white;

  position: relative;
`

const EventTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.138888889;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
`

export default NewsList