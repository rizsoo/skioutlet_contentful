import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const HomepageSection = ({ props, products }) => {
  const [sliderNum, setsliderNum] = useState(4);

  function currencyConverter(number) {
    let priceSep = String(number).split("");
    let priceStr = priceSep.splice(priceSep.length - 3).join("");
    let finalPrice = priceSep.join("") + " " + priceStr + " Ft";
    return finalPrice;
  }

  return (
    <Frame>
      {props.map((el) => {
        console.log(el);

        let res = el.searchTerm && el.searchTerm.map((el) => el.toLowerCase());
        let filtered =
          res &&
          products.nodes
            .filter((prod) =>
              res.every((elem) => prod.title.toLowerCase().includes(elem))
            )
            .slice(sliderNum - 4, sliderNum);
        switch (el.__typename) {
          case "ContentfulSimpleCard":
          case "ContentfulNews":
            return (
              <BgBox bg={el.image && el.image.url}>
                <Link to={el.link ? el.link : el.slug && el.slug}>
                  <span>
                    <h3>{el.title}</h3>
                    {el.short && <p>{el.short}</p>}
                  </span>
                </Link>
              </BgBox>
            );
          case "ContentfulProductCollection":
            return (
              <ProductFrame>
                <IoIosArrowForward
                  onClick={() => setsliderNum(sliderNum + 4)}
                />
                {sliderNum < 5 ? null : (
                  <IoIosArrowBack
                    onClick={() =>
                      setsliderNum(sliderNum < 5 ? sliderNum : sliderNum - 4)
                    }
                  />
                )}
                <h3>{el.title}</h3>
                <RollFrame>
                  {filtered.map((el) => {
                    return (
                      <Link to={`/product/${el.img}`}>
                        <ProductElements>
                          <img
                            alt=""
                            src={`https://img.skioutlet.hu/product_images/${el.brand.toLowerCase()}/${
                              el.img
                            }.jpg`}
                          />
                          <p>{currencyConverter(Number(el.saleprice))}</p>
                        </ProductElements>
                      </Link>
                    );
                  })}
                </RollFrame>
              </ProductFrame>
            );
        }
      })}
    </Frame>
  );
};

export const Frame = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 25px;

  a {
    color: black !important;
  }

  div:first-child {
    grid-area: 1 / 1 / 3 / 2;
  }
  div:nth-child(2) {
    grid-area: 1 / 2 / 2 / 4;
    min-height: 260px;
  }
  div:nth-child(3) {
    grid-area: 2 / 2 / 3 / 4;
  }
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }
`;
export const BgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  border-radius: 8px;
  padding: 15px;

  background-image: url(${(props) => props.bg && props.bg});
  background-size: cover;
  background-position: 0 -50px;
  span {
    display: flex;
    flex-direction: column;
    gap: 5px;

    background-color: white;
    border-radius: 10px;

    padding: 10px 15px;
    p,
    h3 {
      margin: 0;
    }
  }
  @media (max-width: 650px) {
    background-position: center;
    height: 365px;
  }
`;
export const ProductFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;

  position: relative;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  border-radius: 8px;
  padding: 15px;

  max-height: 260px;
  h3 {
    margin: 0;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 25px;
    width: 25px;
  }
  svg:first-child {
    right: 5px;
  }
  svg:nth-child(2) {
    left: 5px;
  }
  @media (max-width: 650px) {
    max-height: unset;
    text-align: center;
    svg {
      top: 27px;
    }
  }
`;
export const RollFrame = styled.div`
  // border: red solid 1px;
  min-height: unset !important;

  display: grid;
  align-items: end;
  justify-content: start;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr) !important;
    margin-top: 30px !important;
  }
`;
export const ProductElements = styled.span`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: 50% 50%;
  img {
    max-height: 145px;
  }
  p {
    background-color: #ed2123;
    margin: 10px 0 0 0;
    width: 100%;
    text-align: center;
    padding: 6px 0;
    border-radius: 8px;
    color: white;
    font-weight: 700;
  }
`;

export default HomepageSection;
