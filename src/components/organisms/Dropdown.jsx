import { IconTrash, IconLink } from '@tabler/icons-react';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import LabelDropdown from './LabelDropdown'
import { DOMAIN, FRONTEND_DOMAIN } from '../../utils/global';
import toast, { Toaster } from 'react-hot-toast';
// * You must make a parent component of the dropdown position relative
const Dropdown = ({ link }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
  
    const handleClickOutside = (e)=>{
      //  console.log(e.target);
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setOpen(false); 
      }
    };

    const copyLink = (noteId) => {
      navigator.clipboard.writeText(`${FRONTEND_DOMAIN}/edit/?note_id=${noteId}/`);
      toast.success("Link copied to clipboard");
      // console.log("link copied to clipboard")
    }
  
   useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //  we have to remove the event listener when the element unmounts
    };
   }, []); 

  return (
    <>   
        <Toaster/> 
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
        <li className='flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
            <IconLink className='h-5 w-5'/>
            <a href="#" onClick={() => copyLink(link)} className="block  dark:hover:text-white">Copy link</a>
        </li>
        <li className='flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
            <IconTrash className='h-5 w-5'/>
            <a href="#" className="block dark:hover:text-white">Delete</a>
        </li>
        </ul>
    </div>

}
        </div>
   
    </>
  )
}

export default Dropdown;