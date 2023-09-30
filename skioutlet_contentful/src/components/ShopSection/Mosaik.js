import React from 'react'
import Item from './Item'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const Mosaik = ({ sorting, filteredProducts, nextNum, size, lang, searchTerm }) => {
    const [items, setItems] = useState([])
    const [local, setLocal] = useState(localStorage.getItem("items") || "")

    useEffect(() => {
        localStorage.setItem('items', items);
    }, [items]);

    function renderSorting(val) {
        if (val === "name") {
            return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (val === "cheap") {
            return filteredProducts.sort((a, b) => Number(a.saleprice) - Number(b.saleprice));
        } else if (val === "pricy") {
            return filteredProducts.sort((a, b) => Number(b.saleprice) - Number(a.saleprice));
        } else {
            return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));  // Return the original array in case of an error
        }
    }

    return (
        <ProductsList id="termekek">
            {filteredProducts.length > 0 ?
                renderSorting(sorting).filter((item, i) =>
                    i >= nextNum - 16 & i < nextNum).map((prod, index) =>
                        <Item key={index} prod={prod} size={size} lang={lang} searchTerm={searchTerm} items={items} setItems={setItems} sorting={sorting} />) : <h2 className='sorry'>Nem található termék...</h2>}
        </ProductsList>
    )
}

export const ProductsList = styled.section`
  max-width: 940px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  padding: 25px 0px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 25px 15px;
  }
`;

export default Mosaik