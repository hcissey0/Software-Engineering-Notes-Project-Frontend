import React from 'react'
import Badge from '../atoms/Badge'
import { useState, useRef, useEffect } from 'react';
import { IconCheck } from '@tabler/icons-react';

const LabelDropdown = () => {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState({name: 'empty', color:'blue'});
  const dropdownRef = useRef();
  const labels = [
    { name: 'Education', color: 'orange' },
    { name: 'UI/UX', color: 'blue' },
    { name: 'Personal', color: 'green' },
  ]

  const handleClick = ()=>{
    setOpen(!open);
  };

  const handleClickOutside = (e)=>{
    // console.log(e.target);
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

        <div className='relative' ref={dropdownRef}>
            <div onClick={handleClick} className='cursor-pointer'>
                <Badge rounded color={chosen.color} text={chosen.name}/>
            </div>


            {open &&  <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 absolute left-4 top-8 rounded-md shadow-lg w-44 dark:bg-gray-700">
        <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {
                labels.map((label)=>
                    <li className='mb-2 hover:bg-gray-100 cursor-pointer p-1 flex justify-between' onClick={()=>{setChosen(label)}}>
                         <Badge rounded text={label.name} color={label.color}/>
                         {chosen.name == label.name && 
                         
                         <div>
                            <IconCheck className='w-5 h-5'/>
                         </div>
                         }
                    </li>
                )
            }
        </ul>
    </div>

}
       
        </div>

     
    
    </>
  )
}

export default LabelDropdown;