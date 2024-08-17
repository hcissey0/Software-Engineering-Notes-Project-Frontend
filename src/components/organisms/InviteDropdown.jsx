import { IconChevronDown } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react'

const InviteDropdown = ({choose, permission, email}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const handleClickOutside = (e)=>{
        //  console.log(e.target);
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

  return (<>
  

     <div ref={dropdownRef}>
        <button 
        onClick={()=>{setOpen(!open)}}
        className='flex items-center text-sm'>
         {permission}
        <IconChevronDown/>
        </button>
          
          {open &&
        <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 absolute top-8 right-0 rounded-md shadow-lg w-44 dark:bg-slate-900">
        <ul className="py-2 text-sm text-gray-700 dark:text-white" aria-labelledby="dropdownDefaultButton">
          <li 
          onClick={()=>{choose(email, 'Can View')}}
          className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer'>
              Can View
          </li>

          <li 
          onClick={()=>{choose(email, 'Can Edit')}}
          className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer'>
            Can Edit
          </li>
        </ul>
    </div>

}
</div>
   
  </>
  )
}

export default InviteDropdown;