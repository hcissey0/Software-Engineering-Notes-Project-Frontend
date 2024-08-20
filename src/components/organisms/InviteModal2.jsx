import React, { useEffect, useState } from 'react'
import { fetchData } from '../../utils/jsonServer'
import { DOMAIN } from '../../utils/global'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';

const InviteModal2 = ({openModal=true, setOpenModal, refreshValue, refreshFunc}) => {
  const [invites, setInvites] = useState(null);

  const getInvites = async() => {
    const data = await fetchData(DOMAIN + `/api/invites/?username=${localStorage.getItem('username')}`, {})
    if(data != null){
        setInvites(data); 
        localStorage.setItem('invite_count', data.length)
        refreshFunc(!refreshValue);
    }
  }

  const replyInvite = async(invite, reply)=>{
    const data = await fetchData(DOMAIN + `/api/invites/?reply=True`, {method:'POST', auth:true, body:{...invite, reply:reply}})
    if(data != null){
        setInvites(data); // the invite has processed and removed from the list of invites
        localStorage.setItem('invite_count', data.length)
        toast.success(reply == 'accept'? 'invite accepted': 'invite declined');
    }
  }; 

  useEffect(()=>{
    getInvites();
  }, [])
  return (
    <>
    {
      openModal &&
      <div tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex bg-black/40 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    My Invites
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

              {/* main body */}
              <div className="p-4 md:p-5 space-y-4">
                    {(invites != null) && 
                        invites.map((invite)=>  <div key={invite.note_id} className='flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'>
                        <div>Invite sent by <Link to={`/${invite.sender}`} reloadDocument className='generalLink'>{invite.sender}</Link> for <span className='font-bold'>{invite.note_title}</span> <Badge text={invite.permission} /> </div>
                        <div className="flex items-center">
                            <button
                            onClick={()=>{replyInvite(invite, 'accept')}}
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept</button>
                            <button 
                            onClick={()=>{replyInvite(invite, 'decline')}}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                         </div>
                       </div>)
                       
                       
                    }

                    {
                    invites != null && invites.length == 0 && 
                      <p className='text-center font-bold'>No invites</p>
                    }

                    

                  
              </div>
              {/* end main body */}

              {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                  <button type="button"
                   className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
              </div> */}
          </div>
      </div>
   </div>
    } 
    </>
  )
}

export default InviteModal2;