import { IconTrash, IconLink, IconStar } from '@tabler/icons-react';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import LabelDropdown from './LabelDropdown'
import { DOMAIN, FRONTEND_DOMAIN } from '../../utils/global';
import toast, { Toaster } from 'react-hot-toast';
import { fetchData } from '../../utils/jsonServer';
import Spinner from './Spinner';

export const addToFavs = async (note, add)=>{
  const data = await fetchData(DOMAIN + `/api/update-note/${note.id}/`, { method: "PATCH", body: {favorite:add, label:{...note.label, labelId:note.label.id}} });
  if(data != null){
    toast.success(add? 'Added to favourites': 'Removed from favourites')
  }
 };

// * You must make a parent component of the dropdown position relative
const Dropdown = ({ note , onChange }) => {
    const noteId = note.id; 
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef();
  

    const handleClickOutside = (e)=>{
      //  console.log(e.target);
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setOpen(false); 
      }
    };

    const deleteNote = async() => {
      setLoading(true)
      const response = await fetchData(DOMAIN + `/api/delete-note/${noteId}/`, {method:'DELETE', returnResponse:true});
      if(response.ok){
        toast.success("Note Deleted Successfully");
        setLoading(false)
        onChange()
      }
    };


    const copyLink = async() => {
      localStorage.setItem('copied_note_title', note.title);
      await navigator.clipboard.writeText(`${FRONTEND_DOMAIN}/edit/?note_id=${noteId}`);
      toast.success("Link copied to clipboard")
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
        <div ref={dropdownRef}>
          <button
            // id={note.id}
            // data-dropdown-toggle
            onClick={()=>{setOpen(!open)}}
            className=""
            type="button"
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-5 aspect-square dark:fill-gray-400" viewBox="0 0 24 24" >
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
            </path></svg>
          </button>
          {open &&
        <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 absolute right-3 top-12 rounded-md shadow-lg w-44 dark:bg-slate-900">
        <ul className="py-2 text-sm text-gray-700 dark:text-white" aria-labelledby="dropdownDefaultButton">
        <li
        onClick={copyLink} 
        className='flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-slate-800'>
            <IconLink className='h-5 w-5'/>
            <a href="#" className="block  dark:hover:text-white">Copy link</a>
        </li>
        
        {note.can_edit && 
        
          <li
          onClick={deleteNote} 
          className='flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-slate-800'>
              <IconTrash className='h-5 w-5'/>
              <a href="#" className="block dark:hover:text-white">Delete</a>
          </li>
        }

        <li
        onClick={async()=>{await addToFavs(note, true); onChange()}} 
        className='flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-slate-800'>
          <IconStar className='h-5 w-5'/>
          <a href="#" className="block dark:hover:text-white">Star</a>
        </li>
         {loading && 
         
          <li className='flex justify-center p-2'>
              <Spinner/>
          </li>
         }
        </ul>
    </div>

}
        </div>
   
    </>
  )
}

export default Dropdown;