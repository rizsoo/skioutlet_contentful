import React from 'react'
import styled from 'styled-components'

const FilterWord = ({ state, actions, word, index, setSearchTerm, searchTerms }) => {
    const info = state.router.link
    const linkFirstPart = info.split("=")[0]

    function deleteTag() {
        let newList = searchTerms.split(" ").filter((item) => item !== word);
        setSearchTerm(newList.join(" "))
        let newListArray = newList.length > 1 ? newList.join("+") : newList;
        actions.router.set(`${linkFirstPart}=${newListArray}`)
    }

    return (
        <FilterWords
            key={index}
        >{word}<ion-icon onClick={() => deleteTag()} name="close-circle-outline"></ion-icon></FilterWords>
    )
}

export const FilterWords = styled.h3`
    margin: 0;
    background-color: #ffc4c4;
    border-radius: 5px;
    padding: 6px 10px;

    display: flex;
    align-items: center;
    gap: 7px;
    cursor: context-menu;
    white-space: nowrap;
    ion-icon {
      font-size: 20px !important;
      --ionicon-stroke-width: 40px;
      color: black !important;
      cursor: pointer;
    }
`

export default FilterWord