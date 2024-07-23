import React, { useState, useRef, useEffect } from 'react'
import { IconSettings, IconDots, IconCheck } from '@tabler/icons-react'
import Badge from '../atoms/Badge'
import { colors } from '../../utils/global'

const LabelSetting = ({label}) => {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null) // this is defines the positioning of a list item
  const dropdownRef = useRef();
  const handleClickOutside = (e)=>{
    // console.log(e.target);
    if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
      setOpen(false); 
    }
  };
  
  
  useEffect(()=>{
    const rect = dropdownRef.current.getBoundingClientRect()
    setRect(rect)
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //  we have to remove the event listener when the element unmounts
    };
   }, []); 


  return (
    <li ref={dropdownRef} className='mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer p-1 items-center flex justify-between'>
        <Badge rounded text={label.title} color={label.color}/>
        <IconDots onClick={()=>{setOpen(!open)}}/>
        
        {open && 
        
        <div className='z-10 bg-white divide-y divide-gray-100 absolute left-56 rounded-md shadow-lg w-44 dark:bg-gray-800' style={{top: `${rect.top}px`}}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
           {
            colors.map((color, index)=>
                <li className='flex items-center px-4 py-2 gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
                    <div className={`w-5 aspect-square rounded-full bg-${color}-100 dark:bg-${color}-700`}>
                    </div>

                    <div className='flex w-full justify-between items-center'>
                        <a href="#" className="block dark:hover:text-white">{color}</a>
                        {color == label.color && 
                        <IconCheck className='dark:stroke-gray-400'/>
                        }
                    </div>
                </li>
            )
           }
           
            </ul>
        </div>
        }
</li>
  )
}

export default LabelSetting