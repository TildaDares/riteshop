import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderColor: '#0d0c22',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#1f1f1f30',
  '&:hover': {
    backgroundColor: '#1f1f1f30',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#0d0c22',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    color: '#0d0c22',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!keyword.trim().length) return
    router.push(`/search?keyword=${keyword.trim()}`)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={keyword}
          onChange={handleInputChange}
        />
      </Search>
    </form>
  )
}

export default SearchBar;
