import React, { useRef, useState } from 'react'
import { fetchData } from '../../utils/jsonServer';
import { DOMAIN } from '../../utils/global';
import toast from 'react-hot-toast';

const Modal = ({openModal=true, setOpenModal}) => {
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings'))); 
  const autosaveRef = useRef(); 
  const lastVisitedRef = useRef();
  const updateSetting = (key, value)=>{
     const newSettings = {...settings}; 
     newSettings[key] = value;
    //  console.log(newSettings);
     setSettings(newSettings); 
  }

  const saveSettings = async()=>{
      const data = await fetchData(DOMAIN + `/api/update-settings/`, {method:'POST', body:settings, auth:true});
      if(data != null){
        console.log(data);
         localStorage.setItem('settings', JSON.stringify(data)) // put the new settings in place
         toast.success('Settings Saved');
      }
  };

  return (
    <>
    {
      openModal &&
      <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex bg-black/40 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    My Settings
                  </h3>
                  <button type="button"
                  onClick={()=>{setOpenModal(false)}}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                  <div className='flex justify-between'>
                      <div>
                        <div className='font-bold text-lg'>Autosave</div>
                        <p className='text-sm w-2/3'>Choose whether your notes should be saved automatically</p>
                      </div>
                     
                      <div>
                      <label className="inline-flex items-center mb-5 cursor-pointer h-full">
                          <input ref={autosaveRef} type="checkbox" checked={settings.autosave} onChange={()=>{updateSetting('autosave', autosaveRef.current.checked)}}  className="sr-only peer"/>
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                  </div>
                  <div className='flex justify-between'>
                     <div>
                        <div className='font-bold text-lg'>Last Visited</div>
                        <p className='text-sm w-2/3'>Access your last visited page when you access Notes</p>
                      </div>
                     
                      <div>
                        <label className="flex items-center mb-5 cursor-pointer h-full">
                            <input ref={lastVisitedRef} type="checkbox" checked={settings.load_last_page}  onChange={()=>{updateSetting('load_last_page', lastVisitedRef.current.checked)}} className="sr-only peer"/>
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                  </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button 
                  onClick={saveSettings}
                  type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                  <button
                  onClick={()=>{setOpenModal(false)}} 
                  type="button"
                   className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
              </div>
          </div>
      </div>
   </div>
    } 
    </>
  )
}

export default Modal;