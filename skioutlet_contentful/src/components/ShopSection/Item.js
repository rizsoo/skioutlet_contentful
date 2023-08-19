import React from 'react'
import { generatePath } from 'react-router-dom';
import { Link } from 'gatsby';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeartIco from '../../assets/img/icons/heart.png'
import RedHeartIco from '../../assets/img/icons/redheart.png'

function currencyConverter(number) {
  let priceSep = String(number).split("");
  let priceStr = priceSep.splice(priceSep.length - 3).join("");
  let finalPrice = priceSep.join("") + " " + priceStr + " Ft";
  return finalPrice;
}

const Item = ({ prod, size, lang, searchTerm }) => {

  let prodTitle = String(prod.title);
  let prodBrand = String(prod.brand);
  let imgFolderName = prodBrand.toLowerCase();
  let prodImg = String(prod.img);
  // Get image
  const [imgData, setImgData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [heartStatus, setHeartStatus] = useState(HeartIco)

  function setSource() {
    try {
      const src = `https://img.skioutlet.hu/product_images/${imgFolderName}/${prodImg}.jpg`
      setImgData({ src });
    }
    catch (err) {
      setImgData("")
    }
  }

  useEffect(() => {
    setSource();
  }, [searchTerm, size])

  return (
    <ItemFrame>
      <Link to={generatePath("/:lang/product/:id", {
        id: prodImg,
        lang: lang === "hu" ? "" : "en"
      })}>
        <ItemContent>
          <HeartIcon src={heartStatus} onMouseEnter={() => setHeartStatus(RedHeartIco)} onMouseLeave={() => setHeartStatus(HeartIco)} />
          <ImageContainer>
            <img className='productwall-img' style={{ display: loaded ? "block" : "none" }} src={imgData.src} alt={prodImg} onLoad={() => setLoaded(true)} />
          </ImageContainer>
          <h2 className='product-title'>{prodTitle}</h2>
          {/* <p>{prod.img}</p> */}
          <ItemPrice>
            {prod.saleprice === prod.price ? null : <h2><SalePrice>{currencyConverter(prod.price)}</SalePrice></h2>}
            <h2>{currencyConverter(prod.saleprice)}</h2>
          </ItemPrice>
        </ItemContent>
      </Link>
    </ItemFrame>
  )
}

export const ItemFrame = styled.div`
  max-height: 450px;
  min-height: 400px;
  background-color: white;
  padding-top: 13px;

  text-align: center;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;

  @media (max-width: 600px) {
    width: 100%;
    min-height: 300px;
  }
`;

export const HeartIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 12px;
  height: 22px;
`

export const ItemContent = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  overflow: hidden;
  position: relative;
  p {
    cursor: text;
  }
  img {
    max-height: 282px;
    object-fit: contain;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
    padding: 0 8px;
    margin: 10px 0;
    line-height: 25px;

    text-decoration: none !important;

    background-color: white;
    color: #1f1f1f;
    font-family: "Raleway", sans-serif;
    z-index: 1;
  }
  @media (max-width: 600px) {
    h2 {
      font-size: 15px;
      line-height: 20px;
    }
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 18px 0px 18px;
`

export const ItemPrice = styled.div`
  width: 100%;
  background-color: #ed2123;
  color: white;

  padding: 5px 0 4px 0;

  display: flex;
  justify-content: center;
  align-items: center;
    h2 {
      margin: 13px 0;
      font-size: 20px;
      background-color: #ed2123 !important;
      color: white !important;
    }
    @media (max-width: 600px) {
      h2 {
        margin: 3px 0;
        font-size: 15px;
      }
    }
`;

export const SalePrice = styled.s`
  font-weight: lighter;
  color: rgb(233, 147, 147);
  transform: scale(0.5);
`;

export default Item