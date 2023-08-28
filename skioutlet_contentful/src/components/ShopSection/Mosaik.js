import React from 'react'
import Item from './Item'
import styled from 'styled-components'

const Mosaik = ({ sorting, filteredProducts, nextNum, size, lang, searchTerm }) => {

    function renderSorting(val) {
        if (val === "name") {
            return filteredProducts.sort((a, b) => a.title > b.title ? 1 : -1)
        } else if (val === "priceHigh") {
            return filteredProducts.sort((a, b) => a.price > b.price ? 1 : -1)
        } else if (val === "priceLow") {
            return filteredProducts.sort((a, b) => a.price > b.price ? -1 : 1)
        } else return filteredProducts.sort((a, b) => a.title > b.title ? 1 : -1)
    }

    return (
        <ProductsList id="termekek">
            {filteredProducts.length > 0 ?
                renderSorting(sorting).filter((item, i) =>
                    i >= nextNum - 16 & i < nextNum).map((prod, index) =>
                        <Item key={index} prod={prod} size={size} lang={lang} searchTerm={searchTerm} sorting={sorting} />) : <h2 className='sorry'>Nem található termék...</h2>}
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