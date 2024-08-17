import React from 'react'
import Badge from '../atoms/Badge'
import { useState, useRef, useEffect } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { fetchData } from '../../utils/jsonServer';
import { DOMAIN } from '../../utils/global';
import Spinner from './Spinner';
import DropdownSkeleton from './DropdownSkeleton';
import { getRandomColor } from '../../utils/global';

const LabelDropdown = ({label, note, onChange}) => {
  const defaultLabel = {title: 'empty', color:'blue'}
  const [color, setColor] = useState(getRandomColor())
  const defaultLabels = useRef(null);
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(label || defaultLabel);
  const [labels, setLabels] = useState(defaultLabels.current)
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();
  const labelSearchRef = useRef();

  const filterLabels = (name)=>{
    // console.log(name);
    if(name == ''){
      setLabels(defaultLabels.current);
    }
    else{
      setLabels(defaultLabels.current.filter(label => label.title.toLowerCase().includes(name)));
    }
  
  };

  const handleClick = ()=>{
    if(note != null && !note.can_edit)return;
    setOpen(!open);
  };

  const handleClickOutside = (e)=>{
    // console.log(e.target);
   if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
     setOpen(false); 
   }
 };

 const createLabel = async(label)=>{
  setLoading(true);
   const data = await fetchData(DOMAIN + '/api/create-label/', {method:'POST', body:{...label, user:localStorage.getItem('username')}});
   if(data != null){
      defaultLabels.current = [...defaultLabels.current, data]; // add the new label to it
      setLabels(defaultLabels.current);
      setChosen(data); 
      setLoading(false);
   }
 };

 const getLabels = async()=>{
    const labels = await fetchData(DOMAIN + '/api/get-labels/', {auth:true})
    if(labels != null){
      defaultLabels.current = [defaultLabel, ...labels]; // the first time we get our labels we add the default one to it
      setLabels(defaultLabels.current)
    }
 };

 useEffect(()=>{
  onChange(chosen)
  setColor(getRandomColor())
 }, [chosen])

 useEffect(()=>{
     getLabels();
 }, [])

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
                <Badge rounded color={chosen.color} text={chosen.title}/>
            </div>


        {open &&  <div id="dropdown" className="z-10 bg-white absolute left-4 top-8 rounded-md shadow-lg w-44 dark:bg-gray-700">
        <div className='p-1 py-2'>
          <input type="text" autoFocus maxLength={25} placeholder='Search label ...' ref={labelSearchRef} onInput={()=>{filterLabels(labelSearchRef.current.value.toLowerCase())}} className='generalInput' />
        </div>
      {
        labels != null &&
      
        <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {
                labels.map((label)=>
                    <li className='mb-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md cursor-pointer p-1 flex justify-between' onClick={()=>{setChosen(label)}}>
                         <Badge rounded text={label.title} color={label.color}/>
                         {chosen.title== label.title && 
                         
                         <div>
                            <IconCheck className='w-5 h-5'/>
                         </div>
                         }
                    </li>
                )
            }

            {labels.length == 0 && 
              <>
                   <li className='mb-2 hover:bg-gray-100 cursor-pointer p-1' onClick={()=>{createLabel({title:labelSearchRef.current.value, color:color})}}>
                      <div className='flex gap-2 justify-center'>
                         <div>Create</div>
                          <Badge rounded text={labelSearchRef.current.value} color={color}/>
                      </div>
                         {/* {chosen.name == label.name && 
                         
                         <div>
                            <IconCheck className='w-5 h-5'/>
                         </div>
                         } */}
                    </li>
                  {
                    loading && 
                    <li>
                       <div className='flex items-center justify-center p-2'>
                         <Spinner/> 
                       </div>
                    </li>
                  }
              </> 
            
            }

        </ul>
      }

      {
        labels == null && 
        <DropdownSkeleton/>
      }
    </div>

}
       
        </div>

     
    
    </>
  )
}

export default LabelDropdown;