import React from 'react'
import {FaSearch} from 'react-icons/fa'
function SearchHelper() {
  return (
    <div className='flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1'>
  <input 
    className="flex-1 text-black outline-none" 

  />
  <button className='cursor-pointer'>
    <FaSearch className='w-5 h-5 text-black' />
  </button>
</div>

  )
}

export default SearchHelper
