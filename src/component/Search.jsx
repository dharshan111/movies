import React from 'react'
import searchicons from "../assets/searchicon.png"

const Search = ({search, setSearch}) => {
    // setSearch ("hello every")
  return (
    <div className='search'>
        <div>
            <img src={searchicons} alt="search-icons" />

            <input type="text"
            placeholder='Search through thousands of movies'
            values={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
    </div>
  )
}

export default Search;