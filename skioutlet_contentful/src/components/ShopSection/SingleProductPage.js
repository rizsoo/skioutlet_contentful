import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

let SingleProductPage = ({ props, lang, slug, product, products }) => {

  //data
  let result = products.nodes.filter(el => el.img === product.img);

  // Get product gender //
  function getGender(val) {
    if (val.includes("férfi")) return "Férfi";
    if (val.includes("női")) return "Női";
    if (val.includes("junior")) return "Junior";
    if (val.includes("gyerek")) return "Gyerek";
    else return "Unisex"
  }

  let prodTitle = String(product.title);
  let prodImg = String(product.img);
  let prodBrand = String(product.brand);
  // let prodBrandLow = prodBrand.toLowerCase();
  let prodPrice = product.price;
  let prodSalePrice = product.saleprice;
  let prodSku = product.sku;
  let prodGender = String(getGender(prodTitle));
  //kategoriak
  let prodCat1 = product.cat1
  let prodCat2 = product.cat2


  // CURRENCY STLYE CONVERTER
  function currencyConverter(number) {
    let priceSep = String(number).split("");
    let priceStr = priceSep.splice(priceSep.length - 3).join("");
    let finalPrice = priceSep.join("") + " " + priceStr + " Ft";
    // console.log(finalPrice);
    return finalPrice;
  }

  // Get image
  const [imgData, setImgData] = useState([])
  function setSource() {
    try {
      const src = `https://img.skioutlet.hu/product_images/${prodBrand.toLowerCase()}/${prodImg}.jpg`
      setImgData({ src });
    }
    catch (err) {
      console.log("img doesn't exists");
    }
  }

  useEffect(() => {
    setSource();
  }, [prodBrand])


  return (
    <ProductContent>
      <img src={imgData.src} alt={prodImg} />
      {/* {imgData.map((slide, index) => { 
          return (
            <div className={index === current ? "active" : ""} key={index}>
                    {index === current && (<img className='single-prod-img' src={slide} alt="" />)}                    
            </div>
          )
        })}
        {current > 0 ? <div onClick={prevSlide} className="arrows prev-arrow"><ion-icon name="arrow-back-circle-outline"></ion-icon></div> : null}
        {current < imgData.length - 1 ? <div onClick={nextSlide} className="arrows next-arrow"><ion-icon name="arrow-forward-circle-outline"></ion-icon></div> : null}
       */}
      <ProductDetailBox>
        <h2>{prodTitle}</h2>
        <SinglePriceTag>
          <h2>{currencyConverter(prodSalePrice)}</h2>
          {prodSalePrice === prodPrice ? null : <h2><SalePrice>{currencyConverter(prodPrice)}</SalePrice></h2>}
        </SinglePriceTag>
        {/* <p>{prodImg}</p> */}
        <SingleProductDetails>
          <ProductSizeList>
            <b>{props.stock}</b>
            {result.map((prod, index) =>
              <SizeListColumn key={index}>
                {prod.size ? <Asd>{prod.size}</Asd> : null}
                <Dsa>{prod.stock != null ? prod.stock.split(",").shift() : ""} {props.piece}</Dsa>
              </SizeListColumn>
            )}
          </ProductSizeList>
          <div>
            <b>{props.cathegory}</b>
            <CatListColumn><Wsd>
              <Link to={`/shop/?s=${prodCat1}`}>{prodCat1}</Link>
              , <Link to={`/shop/?s=${prodBrand}`}>{prodBrand}</Link>
              , <Link to={`/shop/?s=${prodGender}`}>{prodGender}</Link>
            </Wsd></CatListColumn>
          </div>
        </SingleProductDetails>
        <ImportantInfo>{props.comment}</ImportantInfo>
        <ProdSub>{props.sku}: {prodSku}</ProdSub>
      </ProductDetailBox>
    </ProductContent>
  )
}

export const ProductContent = styled.div`
  max-width: 900px;
  margin: 20px auto;
  
  display: flex;
  justify-content: space-between;
  gap: 15px;
  img {
    max-width: 350px;
    width: calc(100vw - 20px);
    height: fit-content;
    @media (max-width: 600px) {
      max-width: 100%;
    }
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`
export const ProductDetailBox = styled.div`
    background-color: rgb(239, 239, 239);
    padding: 15px;
    width: calc(100% - 30px);
    min-width: 280px;
    max-width: 600px;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 15px;
    p {
      margin: 0;
    }
    h2 {
      margin: 0;
      background-color: white;
      padding: 15px 20px;
      border-radius: 7px;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
`
export const SinglePriceTag = styled.div`
  background-color: #E93A3A;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 7px;
  h2 {
    background-color: #E93A3A;
    padding: 0;
    color: white !important;
  }
`
export const SalePrice = styled.s`
  font-weight: lighter;
  color: rgb(233, 147, 147);
  transform: scale(0.5);
`;
export const SingleProductDetails = styled.div`
  display: flex;
  gap: 15px;
`
export const ProductSizeList = styled.div`
  padding: 0;
  margin: 0;
`
export const SizeListColumn = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 2px 0;
  width: 160px;

  margin: 5px 0;
  background-color: white;
  border-radius: 7px; 
`
export const Asd = styled.span`
  padding: 2px 7px;
  font-weight: 600;
`
export const Dsa = styled.span`
  color: rgb(40, 146, 70);
  font-weight: 600;
  padding: 2px 7px;
  text-align: right;
`
export const CatListColumn = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;

  padding: 2px 0;
  width: 100%;

  margin: 5px 0;
  border-radius: 7px;
`
export const Wsd = styled.span`
  font-weight: 600;
  color:#ED2123;
`
export const ImportantInfo = styled.p`
  margin: 20px 0 !important;
  font-style: italic;
`
export const ProdSub = styled.p`
  font-size: 12px;
`

export default SingleProductPage