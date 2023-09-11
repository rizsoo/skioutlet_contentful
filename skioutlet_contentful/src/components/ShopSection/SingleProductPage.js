import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi';

import { RxValueNone } from 'react-icons/rx';

let SingleProductPage = ({ props, lang, slug, product, products }) => {
  const [is404, setIs404] = useState(false);
  const [isSecondImg, setIsSecondImg] = useState(false);
  const [sliderNum, setSliderNum] = useState(1)

  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);


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
  let link = `https://img.skioutlet.hu/product_images/${prodBrand.toLowerCase()}/${prodImg}${sliderNum < 2 ? "" : ("_" + sliderNum)}.jpg`

  function setSource() {
    try {
      const src = link;
      setImgData(src);
    }
    catch (err) {
      console.log("img doesn't exists");
    }
  }

  useEffect(() => {
    setSource();
  }, [prodBrand, sliderNum])

  // Check if there is any image
  const checkLink = () => {
    const img = new Image();
    img.src = link;

    img.onerror = () => {
      setIs404(true);
    };

    img.onload = () => {
      setIs404(false);
    };
  };
  checkLink()

  // Check for second image
  const checkSecondImage = () => {
    const img = new Image();
    img.src = `https://img.skioutlet.hu/product_images/${prodBrand.toLowerCase()}/${prodImg}_${sliderNum + 1}.jpg`;

    img.onerror = () => {
      setIsSecondImg(false);
    };

    img.onload = () => {
      setIsSecondImg(true);
    };
  };
  checkSecondImage()

  return (
    <ProductContent>
      <ImageContainer>
        {!is404 ? <img ref={containerRef} src={imgData} alt={prodImg} /> : <NoImage><RxValueNone /><h3>No image</h3></NoImage>}
        {isSecondImg ? <HiArrowCircleRight onClick={() => setSliderNum(sliderNum + 1)} style={{ right: "5px" }} /> : null}
        {sliderNum < 2 ? null : <HiArrowCircleLeft onClick={() => setSliderNum(sliderNum - 1)} style={{ left: "5px" }} />}
      </ImageContainer>
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
export const ImageContainer = styled.div`
    position: relative;
    img {
      aspect-ratio: 0.75;
      object-fit: contain;
    }
    svg {
      position: absolute;
      top: 10px;
      // transform: translateY(-50%);
      color: #ed2123;
      width: 32px;
      height: 32px;
      transition: all ease 0.2s;
      background-color: white;
      border-radius: 50%;
    }
    svg:hover {
      color: #cc181a;
      transform: scale(1.1);
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

export const NoImage = styled.div`
    width: 200%;

    color: lightgrey;
    
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    svg {
      width: 50px;
      height: 50px;
      color: lightgrey;
      position: relative;
      border-radius: 0;
      &:hover {
        color: lightgrey;
        transform: unset;
      }
    }
    h3 {
      margin: 0;
    }
    @media (max-width: 650px) {
      width: 100%;
      height: 200px;
      svg {
        width: 120px;
        height: 120px;
      }
      h3 {
        font-size: 30px;
      }
    }
    @media (min-width: 650px) {
      min-height: 250px;
      // border: 3px #f1f1f1 solid;
      svg {
        width: 100px;
        height: 100px;
      }
      h3 {
        font-size: 30px;
      }
    }
`

export default SingleProductPage