import React, { useRef } from 'react'
import { Form } from 'react-router-dom';
import { fetchData } from '../../utils/jsonServer';
import { DOMAIN } from '../../utils/global';
import toast from 'react-hot-toast';

const ChangePictureModal = ({openModal=true, setOpenModal, refreshValue, refreshFunc}) => {
  const imgRef = useRef();
  const inputRef = useRef();
  const formRef = useRef();

  const handleImageChange = ()=>{
    const file = inputRef.current.files[0];
    const url =  URL.createObjectURL(file); 
    imgRef.current.src = url; 
    return ()=>URL.revokeObjectURL(url);
  };

  const uploadImage = async()=>{
      const formData = new FormData(formRef.current)
      const data = await fetchData(DOMAIN + `/api/upload-image/`, {method: 'POST', body:formData, auth:true, formData: true});
      if(data != null){
        toast.success('Image changed successfully')
        localStorage.setItem('profile_pic_url', data.url)
        refreshFunc(!refreshValue);
      }
  };
  
  let defaultUrl = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80';
  const url = localStorage.getItem('profile_pic_url')
  if(url != 'null')defaultUrl = DOMAIN + url; 
  return (
    <>
    {
      openModal &&
      <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex bg-black/40 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Picture
                  </h3>
                  <button type="button"
                  onClick={()=>{setOpenModal(false)}}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>

              {/* main body */}
              <div className="p-4 md:p-5 space-y-4">
              <Form ref={formRef} encType='multipart/form-data' className="flex items-center justify-center space-x-6">
                <div className="shrink-0">
                    <img className="h-16 w-16 object-cover rounded-full" ref={imgRef} src={defaultUrl} alt="Current profile photo" />
                </div>
                <label>
                    <span className="sr-only">Choose profile photo</span>
                    <div className='inline-flex items-center gap-2'>
                      <label
                      className='bg-violet-50 dark:bg-violet-700 dark:hover:bg-violet-800 dark:text-white rounded-full py-2 px-4 text-violet-700 hover:bg-violet-100 font-semibold text-sm'
                      htmlFor="profile-image">Choose</label>
                      <input accept='image/*' name='profile-image' onChange={handleImageChange} type="file" ref={inputRef} id='profile-image' className="text-sm w-28 text-slate-500
                      file:py-2 file:px-4
                      file:hidden"/>
                    </div>
                </label>
            </Form>
              </div>
              {/* end main body */}

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                  onClick={uploadImage}
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

export default ChangePictureModal;