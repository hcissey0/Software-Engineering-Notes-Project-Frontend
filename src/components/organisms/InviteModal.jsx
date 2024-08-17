import React, { useEffect, useRef, useState } from 'react'
import Badge from '../atoms/Badge';
import { IconArrowDown, IconCaretDown, IconCaretDownFilled, IconChevronDown, IconX } from '@tabler/icons-react';
import InviteDropdown from './InviteDropdown';

const InviteModal = ({openModal, setOpenModal}) => {
  const inputRef = useRef();
  const [emails, setEmail] = useState([]);
  const getEmail = () =>{
    const text = inputRef.current.value;
    if(text.includes(',')){
        const currentEmail = text.split(',')[0].trim()
        inputRef.current.value = '';
        setEmail([...emails, {email: currentEmail, permission:'Can View'}]);
        //  console.log([...emails, {email: currentEmail, permission:'Can Read'}]);
    
    }
  };

  const removeEmail = (emailToRemove)=>{
    setEmail(emails.filter(email => email.email != emailToRemove));
  };

  const choosePermission = (targetEmail, permission)=>{
    setEmail(emails.map(email => email.email == targetEmail? {...email, permission: permission}: email));
  };

  return (
        openModal &&
        <div tabindex="-1" aria-hidden="true" className="overflow-hidden flex bg-black/40 fixed top-0 right-0 left-0 z-50 justify-end  w-full md:inset-0 h-full max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full top-6">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Share
                    </h3>
                    <button type="button"
                    onClick={()=>{setOpenModal(false)}}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    <div className='flex flex-wrap gap-4'>
                        {
                            emails.map((email)=><>
                            <div className='flex gap-1 relative'>
                                    <Badge key={email.email} color='blue' text={email.email} cancelButton 
                                    cancelFunc={()=>{removeEmail(email.email)}}/>

                                    <InviteDropdown choose={choosePermission} email={email.email} permission={email.permission} />
                                    </div>
                            </>
                            )
                        }
                    </div>
                    <div className='flex gap-2'>
                        <input onInput={getEmail} ref={inputRef} placeholder='Enter emails separated by commas' type="text" autoFocus className='generalInput' />
                        <button
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Invite</button>
                
                    </div>
                </div>
                {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                </div> */}
            </div>
        </div>
      </div>
    
  )
}

export default InviteModal