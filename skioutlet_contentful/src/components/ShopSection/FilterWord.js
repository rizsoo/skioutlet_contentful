import React from 'react'
import styled from 'styled-components'
import { RiCloseCircleLine } from 'react-icons/ri'

const FilterWord = ({ word, index, setSearchTerm, searchTerms }) => {

    const location = window.location.search

    const linkFirstPart = location.split("=")[0]

    function deleteTag() {
        let newList = searchTerms.split(" ").filter((item) => item !== word);
        setSearchTerm(newList.join(" "))
        let newListArray = newList.length > 1 ? newList.join("+") : newList;
        window.history.pushState({}, '', `${linkFirstPart}=${newListArray}`)
    }

    return (
        <FilterWords
            key={index}
        >{word}<RiCloseCircleLine onClick={() => deleteTag()}></RiCloseCircleLine></FilterWords>
    )
}

export const FilterWords = styled.h3`
    margin: 0 auto;
    max-width: 940px;
    background-color: #ffc4d0;
    border-radius: 5px;
    padding: 6px 10px;

    display: flex;
    align-items: center;
    gap: 7px;
    cursor: context-menu;
    white-space: nowrap;
`

export default FilterWord