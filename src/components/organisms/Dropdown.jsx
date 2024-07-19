import React from 'react'
import { useState, useRef, useEffect } from 'react';
// * You must make a parent component of the dropdown position relative
const Dropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
  
    const handleClickOutside = (e)=>{
       console.log(e.target);
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setOpen(false); 
      }
    };

    
  
   useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //  we have to remove the event listener when the element unmounts
    };
   }, []); 

  return (
    <>   
        <div ref={dropdownRef}>
          <button
            // id={note.id}
            // data-dropdown-toggle
            onClick={()=>{setOpen(!open)}}
            className=""
            type="button"
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-5 aspect-square" viewBox="0 0 24 24" >
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
            </path></svg>
          </button>
          {open &&  <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 absolute right-3 top-12 rounded-md shadow-lg w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
        </li>
        <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
        </li>
        </ul>
    </div>

}
        </div>
   
    </>
  )
}

export default Dropdown;