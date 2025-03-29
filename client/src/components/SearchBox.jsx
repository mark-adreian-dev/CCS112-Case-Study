import React from 'react'
import SearchIcon from '../assets/dashboard/svg/search.svg'

const SearchBox = ({ onchange, value, style }) => {
  return (
    <div className={`justify-center items-center border-b-[1px] border-border-color bg-input-background px-2 ${style}`}>
      <img src={SearchIcon} alt='search-icon' className='mr-2'/>
      <input type="text" className='text-body-M leading-line-height-L text-placehoder-color px-4 py-3  w-full outline-none' onChange={onchange} value={value} />      
    </div>
  )
}

export default SearchBox
