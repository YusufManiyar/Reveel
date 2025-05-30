import React from 'react'
import { SearchOutlined } from '@mui/icons-material'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
    max-width: 550px;
    display: flex;
    width: 90%;
    border: 1px solid ${({ theme }) => theme.text_secondary + 90};
    color: ${({ theme }) => theme.text_primary};
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
    gap: 6px;
    align-items: center;

`;

const SearchBar = ({ onSearch }) => {
  return (
    <SearchBarContainer>
        <SearchOutlined />
        <input
        placeholder='Search with prompt or name...'
        onChange={(e) => onSearch(e.target.value)}
        style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: 'inherit',
            fontSize: "16px",
        }}/>
    </SearchBarContainer>
  )
}

export default SearchBar