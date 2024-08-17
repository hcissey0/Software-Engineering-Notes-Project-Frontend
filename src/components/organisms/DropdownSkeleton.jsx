import React from 'react'

const DropdownSkeleton = () => {
  return (
    <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
   
            <li className='h-6 mb-2  rounded-lg bg-gray-300 animate-pulse'>
               
            </li>
            <li className='h-6 mb-2 rounded-lg bg-gray-300 animate-pulse'>
               
            </li>
            <li className='h-6 mb-2 rounded-lg bg-gray-300 animate-pulse'>
               
            </li>
</ul>
  )
}

export default DropdownSkeleton;