import React, { useState, useRef, useEffect } from 'react'
import { IconSettings, IconDots, IconCheck, IconTrash } from '@tabler/icons-react'
import Badge from '../atoms/Badge'
import { colors, DOMAIN } from '../../utils/global'
import { fetchData } from '../../utils/jsonServer'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const LabelSetting = ({label, onChange}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false) // this is defines the positioning of a list item
  const [style, setStyle] = useState(null);
  const dropdownRef = useRef();
  
  const handleClickOutside = (e)=>{
    // console.log(e.target);
    if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
      setOpen(false); 
    }
  };

  const chooseColor = async(color)=>{
    setLoading(true);
    const response = await fetchData(DOMAIN + `/api/update-label/${label.id}/`, {method:'PATCH', body:{...label, color:color}, returnResponse:true})
    if(response.ok){
      console.log('this ran');
      setLoading(false);
      onChange(); 
    }   
  };
  
  const deleteLabel = async ()=>{
    setLoading(true);
    const response = await fetchData(DOMAIN + `/api/delete-label/${label.id}/`, {method:'DELETE', returnResponse:true});
    if(response.ok){
      setLoading(false);
      toast.success('Label Deleted Successfully');
      onChange(); 
    }
  }

  const openColors = ()=>{
    // const rect = dropdownRef.current.getBoundingClientRect();
    setStyle({bottom: `5rem`})
    setOpen(!open);
  };
  
  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //  we have to remove the event listener when the element unmounts
    };
   }, []); 


  return (
    <>
      <li ref={dropdownRef} className='mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer p-1 items-center flex justify-between'>
          <Badge rounded text={label.title} color={label.color}/>
          <div className='flex'>
          { loading &&  
            <Spinner width='5'/>
            }
            
          <IconDots className='w-5 h-5' onClick={openColors}/>
          </div>
          
          {open && 
          
          <div className='z-10 bg-white divide-y divide-gray-100 absolute left-56 rounded-md shadow-lg w-44 dark:bg-gray-800' style={style}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

            <li
            onClick={deleteLabel} 
            className='flex justify-center px-4 py-2 gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
              <IconTrash className='w-5 h-5'/>
            </li>

         
            {
              colors.map((color)=>
                  <li
                  onClick={()=>{chooseColor(color)}} 
                  key={color} className='flex items-center px-4 py-2 gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <div className={`w-5 aspect-square rounded-full bg-${color}-100 dark:bg-${color}-400`}>
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
    </>
  )
}

export default LabelSetting