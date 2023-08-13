import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ThreeDots } from 'react-loader-spinner';
import Papa from 'papaparse';
import filteredSearchcode from '../functions/filter_by_color';
import arrayMergeByKey from 'array-merge-by-key';
import Search from './Search'
import Section from './Section';
import SectionSize from './SectionSize';
import FilterSearch from './FilterSearch';
import Pagi from './Pagi';
import Mosaik from './Mosaik'
import { Link } from 'gatsby';

//icons
import genderIcon from '../../assets/img/genderIcon.png'
import felszerelesIcon from '../../assets/img/equipement.png'
import jacketIcon from '../../assets/img/jacketIcon.png'
import atomicLogo from '../../assets/img/atomicIcon.png'
import sizeLogo from '../../assets/img/size.png'
import trashIcon from '../../assets/img/recycling.png'

export const ShopSection = ({ lang, slug, products }) => {

  // UTF Decoder
  function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'));
  }

  // PAGER
  const slugNum = Number(slug.split("/")[2]) === 0 ? 1 : Number(slug.split("/")[2])

  // Searchterm
  const searchResult = slug.includes("s=") ? slug.split("s=").pop() : '';

  const queryResult = searchResult != null && searchResult.length > 0 ? searchResult.toLocaleLowerCase() : '';
  const queryLast = queryResult.includes("+") ? queryResult.split("+").join(" ") : queryResult;

  // Orderby
  const orderResult = slug.includes("orderby=") ? slug.split("orderby=").pop() : '';
  const orderNameOnly = orderResult.includes("&") ? orderResult.split("&")[0] : orderResult;

  //STATES
  const [imgData, setImgData] = useState([])
  const [pageNum, setPageNum] = useState(slugNum);
  console.log(pageNum);
  const [searchTerm, setSearchTerm] = useState(urldecode(queryLast))
  const [sorting, setSorting] = useState(orderNameOnly);


  let nextNum = pageNum * 15;

  // Filtering by cat/brand/sex
  let brandList = filteredSearchcode(products, 'brand').filter(data => data.brand != undefined).map(data => data.brand.toLowerCase()).map(brand => brand.includes(" ") ? brand.split(" ").join("-") : brand).sort((a, b) => a.localeCompare(b));

  function filterCat1ByCat2(searchWord) {
    let result = filteredSearchcode(products, 'cat1').map(data => {
      if (data.cat2 === searchWord && data.cat1 != undefined && data.cat2 != undefined) {
        return String(data.cat1).toLowerCase()
      }
    }).sort((a, b) => a.localeCompare(b));
    return result.filter(el => el != undefined && !el.includes("minta"))
  }

  const genders = ["férfi", "női", "gyerek", "unisex"]

  // Get each word
  let allCathegory = [...filterCat1ByCat2("Felszerelés"), ...filterCat1ByCat2("Ruházat"), ...brandList]

  function filterIt(terms, prod, size) {
    let words = terms.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
    words = words.map(val => !val.includes("-") ? val.replace(/\"/g, "") : val.split("-").join(" ").replace(/\"/g, ""));
    const v = Object.values(prod);
    const brandName = prod.brand ? prod.brand.toLowerCase() : "";

    // Is it a cathergory name?
    const catName = prod.cat1 ? prod.cat1.toLowerCase() : "";
    let catNames = [brandName, catName];
    let isCat = words.some(el => allCathegory.includes(el)) ? words.some(el => catNames.some(cat => cat === el)) : true;

    // Does it have a size?
    const sizeOfProduct = String(prod.size)
    let isSize = size != "" ? size.some(el => el === sizeOfProduct) : true;

    const f = JSON.stringify(v).toLowerCase();
    let result = words.every(val => f.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(val) && isCat && isSize)
    return result;
  };

  // Filtermenu STATES
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [selectionList, setSelectionList] = useState([])
  const [sectionList, setSectionList] = useState([])
  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")
  const [size, setSize] = useState("")

  // Filtermenu Cat
  let filterDataCathegory = [...filterCat1ByCat2("Felszerelés"), ...filterCat1ByCat2("Ruházat")]

  const filteredProducts = products.filter(prod => {
    if (searchTerm === "" || filterIt(searchTerm, prod, size)) {
      return prod
    }
  });

  // Get available sizes
  let sizeList = filteredSearchcode(filteredProducts, "size").map(data => String(data.size)).sort((a, b) => a.localeCompare(b)).filter(el => el != "undefined" && el != "null");

  // Handle Clearout Search
  function clearOutSearch() {
    setSearchTerm("")
    setPageNum(1)
    setFilterOpen(false)
    setSorting("")
    setSize("")
    window.history.replaceState(null, "Shop", "/shop/")
  }

  // TOTAL PAGE NUMBER  
  let totalPageNum = Math.ceil(filteredProducts.length / 15);

  const filterButtons = [
    {
      "name": "gender",
      "hun": "Férfi, Női, Gyerek...",
      "icon": genderIcon,
      "list": genders,
      "section": genders
    },
    {
      "name": "equipment",
      "hun": "Felszerelés",
      "icon": felszerelesIcon,
      "list": filterCat1ByCat2("Felszerelés"),
      "section": filterDataCathegory
    },
    {
      "name": "clothing",
      "hun": "Ruházat",
      "icon": jacketIcon,
      "list": filterCat1ByCat2("Ruházat"),
      "section": filterDataCathegory
    },
    {
      "name": "brand",
      "hun": "Márka",
      "icon": atomicLogo,
      "list": brandList,
      "section": brandList
    },
    {
      "name": "size",
      "hun": "Méret",
      "icon": sizeLogo,
      "list": sizeList,
      "section": sizeList
    },
  ];

  return (
    <ShopContent>
{/*       <FilterHeader>
        <FilterBar>
          <Link to={`/shop/`}><DelButton onClick={clearOutSearch} ><img src={trashIcon} alt='' /></DelButton></Link>
          <Search />
        </FilterBar>
        <FilterBar>
          {filterButtons.map((el, index) => {
            // console.log(el);
            return (
              <SectionButton title={el.hun} key={index} onClick={() => {
                setSectionList(el.list);
                setWhichFilterIsOpen(el.name);
                setSelectionList(el.section);
                setSize([])
                setFilterOpen(whichFilterIsOpen === el.name ? !isFilterOpen : true)
              }}>
                <img src={el.icon} alt={el.hun} />
              </SectionButton>
            )
          })}
        </FilterBar>
      </FilterHeader> */}
      {/* Cleancode */}
      {isFilterOpen ? <FilterButton>
        {sectionList.map((tag, index, arr) => {
          // console.log(whichFilterIsOpen);
          if (whichFilterIsOpen != "size") {
            return (
              <Section
                key={index}

                selectionList={selectionList}
                sorting={sorting}

                tag={tag}
                index={index}

                genders={genders}
                whichFilterIsOpen={whichFilterIsOpen}

                setPageNum={setPageNum}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} />
            )
          } else if (searchTerm != "") {
            return (
              <SectionSize
                tag={tag}
                index={index}

                size={size}
                setSize={setSize}
                setPageNum={setPageNum}
              />
            )
          } else if (index === 1) {
            return (
              <p>Válasszon egy termékkategóriát!</p>
            )
          }
        }
        )}
      </FilterButton> : null}
      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        brandList={brandList} />
      <Pagi
        totalPageNum={totalPageNum}
        sorting={sorting}
        searchTerm={searchTerm}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
      {/* <Sorting action="/shop/search/" onInput={() => {
        setSorting(event.target.value)
        actions.router.set(slug.includes("?") ? `${slug}&orderby=${event.target.value}` : `${slug}search/?orderby=${event.target.value}`)
      }}>
        <option name="orderby" value="name" defaultValue={orderNameOnly === "name"}>Név szerint</option>
        <option name="orderby" value="priceLow" defaultValue={orderNameOnly === "priceLow"}>Legdrágább</option>
        <option name="orderby" value="priceHigh" defaultValue={orderNameOnly === "priceHigh"}>Legolcsóbb</option>
      </Sorting> */}
      <Mosaik
        sorting={sorting}
        size={size}
        filteredProducts={filteredProducts}
        nextNum={nextNum} />
      <Pagi
        totalPageNum={totalPageNum}
        sorting={sorting}
        searchTerm={searchTerm}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </ShopContent>
  )
}

export const ShopContent = styled.div`
  margin: 5px -20px;
`;
export const FilterHeader = styled.div`
  display: flex;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 10px;
  margin-bottom: 10px;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  s {
    font-size: 22px;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.125);
    border-radius: 10px;
    cursor: pointer;
    margin: 0;
    background-color: #f9f9f9;
    min-width: 40px;
    min-height: 40px;     
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background-color: white;
      transition: ease 0.1s;  
    }
    @media (max-width: 600px) {
      min-width: calc(25% - 10px);
      min-height: 60px;
    }
  }
  img {
    max-height: 27px;
  }
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
export const DelButton = styled.s`
  color: #ed2123;
  @media (max-width: 600px) {
    ion-icon {
      font-size: 36px;
    }
  }
`
export const SectionButton = styled.s`
    img {
      height: 26px;
      @media (max-width: 600px) {
        height: 36px;
      }
    }
    position: realtive;
`
export const FilterButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
`
export const SizeList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
`
export const SizeTag = styled.div`
    font-size: 17px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    cursor: pointer;
    padding: 5px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #F9F9F9;
`
export const Sorting = styled.select`
    margin-top: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: white;
    padding: 7px;
    border-radius: 5px;
    @media (max-width: 600px) {
      font-size: 1.4rem;
    }
`