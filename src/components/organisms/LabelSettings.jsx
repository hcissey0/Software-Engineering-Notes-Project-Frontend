import {IconLabel } from '@tabler/icons-react';
import React from 'react'
import { useState, useEffect } from 'react';
import Badge from '../atoms/Badge';
import Spinner from './Spinner';
import { useRef } from 'react';
import { fetchData } from '../../utils/jsonServer';
import { DOMAIN } from '../../utils/global';
import { getRandomColor } from '../../utils/global';
import LabelSetting from './LabelSetting';

const LabelSettings = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(getRandomColor())
  const [hasLabels, setHasLabels] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [labels, setLabels] = useState(null);
  const [refresh, setRefresh] = useState(false) // to refresh the label list when one gets modified
  const labelSearchRef = useRef();
  const defaultLabels = useRef(null);

  const filterLabels = (name)=>{
    setTyping(true);
    if(name == ''){
      setLabels(defaultLabels.current);
      setTyping(false);
    }
    else{
      setLabels(defaultLabels.current.filter(label => label.title.toLowerCase().includes(name)));
    }
  
  };  
  
  const getLabels = async()=>{
      const labels = await fetchData(DOMAIN + '/api/get-labels/', {auth:true})
      defaultLabels.current = labels;
      setLabels(labels);
      setHasLabels(labels.length > 0)
    };

    const createLabel = async(label)=>{
      setLoading(true);
       const data = await fetchData(DOMAIN + '/api/create-label/', {method:'POST', body:{...label, user:localStorage.getItem('username')}});
       if(data != null){
          defaultLabels.current = [...defaultLabels.current, data]; // add the new label to it
          setLabels(defaultLabels.current);
          setLoading(false);
          setColor(getRandomColor())
          getLabels();
       }
     };

  const refreshLabels = ()=>{
    setRefresh(!refresh)
  }

 useEffect(()=>{
    getLabels();
}, [refresh])

  return (
    <>
         <li>
            <button type="button" onClick={()=>{setOpen(!open)}} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="labels" data-collapse-toggle="labels">
                  <IconLabel className="dark:stroke-gray-400"/>
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Labels</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
        
        {open && 
        <>
        
         <div className='p-1 py-2'>
            <input type="text" autoFocus maxLength={25} placeholder='Search label ...' defaultValue='' ref={labelSearchRef} onInput={()=>{filterLabels(labelSearchRef.current.value.toLowerCase())}} className='generalInput' />
          </div>    
        
        <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" style={{scrollbarWidth: 'thin'}} aria-labelledby="dropdownDefaultButton">
            {hasLabels &&
                labels.map((label)=>
                    <LabelSetting key={label.id} label={label} onChange={refreshLabels}/>  
                )
            }
            {
                !hasLabels &&
                <div className='text-center'>
                    Your labels will appear here 
                </div>
            }

        {labels.length == 0 && 
          <>
               <li className='mb-2 hover:bg-gray-100 cursor-pointer p-1' onClick={()=>{createLabel({title:labelSearchRef.current.value, color:color})}}>
                      {
                        typing && 
                        <div className='flex gap-2 justify-center'>
                            <div>Create</div>
                            <Badge rounded text={labelSearchRef.current.value} color={color}/>
                        </div>
                      }
                 
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

    {
        labels == null && 
        <DropdownSkeleton/>
      }
        </>
            }
              </li>
    </>
  )
}

export default LabelSettings;