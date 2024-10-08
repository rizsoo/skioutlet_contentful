import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi';

import { RxValueNone } from 'react-icons/rx';
import SmallSlider from './SmallSlider';

let SingleProductPage = ({ props, lang, slug, product, products }) => {

  const [is404, setIs404] = useState(false);
  const [isNextImg, setIsNextImg] = useState(false);
  const [isMoreImg, setIsMoreImg] = useState(false);
  const [sliderNum, setSliderNum] = useState(1)

  const [imageArray, setImageArray] = useState([])

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
  let prodBrand = String(product.brand.toLowerCase());
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
// Get image
const [imgData, setImgData] = useState([]);
let linkBase = `https://img.skioutlet.hu/product_images/${prodBrand.toLowerCase()}/${prodImg}${sliderNum < 2 ? "" : ("_" + sliderNum)}`;

function setSource() {
  try {
    // Try loading the .jpg version first
    const jpgLink = `${linkBase}.jpg`;
    setImgData(jpgLink);
  } catch (err) {
    console.log(".jpg image doesn't exist, trying .webp");

    try {
      // If the .jpg fails, try the .webp version
      const webpLink = `${linkBase}.webp`;
      setImgData(webpLink);
    } catch (err) {
      console.log("Neither .jpg nor .webp images exist");
      setImgData(""); // Set empty data if both formats fail
    }
  }
}


  useEffect(() => {
    setSource();
  }, [prodBrand, sliderNum])

  // // Check for second image
  // const checkNextImage = () => {
  //   const img = new Image();
  //   img.src = `https://img.skioutlet.hu/product_images/${prodBrand}/${prodImg}_${sliderNum + 1}.jpg`;

  //   img.onerror = () => {
  //     setIsNextImg(false);
  //   };

  //   img.onload = () => {
  //     setIsNextImg(true);
  //   };
  // };
  // checkNextImage()

  let array = Array.from(Array(20 + 1).keys()).slice(1);

  // Function to check if an image URL is valid
  useEffect(() => {
    // Function to check if an image URL is valid
    async function isValidImageUrl(url) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }

    // Perform the asynchronous operation inside useEffect
    Promise.all(
      array.map((el) => {
        let imageUrl = `https://img.skioutlet.hu/product_images/${prodBrand}/${prodImg}${el > 1 ? `_${el}` : ''}.jpg`;
        return isValidImageUrl(imageUrl).then((isValid) => (isValid ? imageUrl : null));
      })
    )
      .then((validImageUrls) => {
        // Filter out null values (invalid URLs)
        const filteredUrls = validImageUrls.filter((url) => url !== null);

        // Update the state only if it's different from the current state
        if (JSON.stringify(filteredUrls) !== JSON.stringify(imageArray)) {
          setImageArray(filteredUrls);
        }
      })
      .catch((error) => {
        console.error('Error checking image URLs:', error);
      });
  }, [array, prodBrand, prodImg, imageArray]);

  return (
    <ProductContent>
      <ImageContainer>
        {imageArray.length > 0 ? <FeaturedImage src={imageArray[sliderNum - 1]} alt={prodImg} /> : <NoImage><RxValueNone /><h3>No image</h3></NoImage>}
        {/* {!is404 ? <FeaturedImage src={imageArray[sliderNum - 1]} alt={prodImg} /> : <NoImage><RxValueNone /><h3>No image</h3></NoImage>} */}
        {imageArray.length > sliderNum && <HiArrowCircleRight onClick={() => setSliderNum(sliderNum + 1)} style={{ right: "5px" }} />}
        {sliderNum < 2 ? null : <HiArrowCircleLeft onClick={() => setSliderNum(sliderNum - 1)} style={{ left: "5px" }} />}
        {imageArray.length > 1 ?
          <MoreImage>
            {imageArray.map((el, i) => {
              return (
                <SmallSlider element={el} i={i} setSliderNum={setSliderNum} sliderNum={sliderNum} />
              )
            })}
          </MoreImage>
          : null}
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
            {result[0].list && result[0].list.map((prod, index) =>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
    @media (min-width: 650px) {
      min-width: 350px;
    }
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
`
export const FeaturedImage = styled.img`
    aspect-ratio: 0.75;
    object-fit: contain;
`
export const MoreImage = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    img {
      aspect-ratio: 1;
      object-fit: contain;
      @media (min-width: 650px) {
        max-width: 90px;
      }
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