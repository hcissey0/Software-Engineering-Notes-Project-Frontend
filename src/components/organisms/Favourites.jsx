import { IconStar } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { fetchData } from '../../utils/jsonServer';
import { DOMAIN } from '../../utils/global';
import DropdownSkeleton from './DropdownSkeleton';

const Favourites = () => {
  const [open, setOpen] = useState(false);
  const [favs, setFavs] = useState(null);
  const getFavourites = async ()=>{
    const favourites = await fetchData(DOMAIN + `/api/get-notes/?username=${localStorage.getItem('username')}`, {auth:true});
    if(favourites != null){
       setFavs(favourites.filter((note)=>note.favorite)); 
    }
  };

  useEffect(()=>{
      getFavourites();
  }, []);

  return (
    <li>
         <button type="button" onClick={()=>{setOpen(!open)}} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="labels" data-collapse-toggle="labels">
                  <IconStar className="dark:stroke-gray-400"/>
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Favourites</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
{
  open && <>
     {(favs != null) && 
        <ul>
            {favs.map((note)=> <li className='mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer p-1 px-4 truncate'>{note.title}</li>)}
            {favs.length == 0 && <li className='text-center'>No favourites yet</li>}
        </ul>
     }

        {
      favs == null && 
      <DropdownSkeleton/>
      }
      </>
}
    </li>
  )
}

export default Favourites