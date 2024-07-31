import { IconStar } from '@tabler/icons-react'
import React, { useState } from 'react'

const Favourites = () => {
    const [open, setOpen] = useState(false);
  return (
    <li>
         <button type="button" onClick={()=>{setOpen(!open)}} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="labels" data-collapse-toggle="labels">
                  <IconStar className="dark:stroke-gray-400"/>
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Favourites</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
    </li>
  )
}

export default Favourites