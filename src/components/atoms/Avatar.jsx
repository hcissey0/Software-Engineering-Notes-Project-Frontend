import React, { useState, useEffect, useRef } from 'react'
import AvatarSkeleton from './AvatarSkeleton';
import { Link } from "react-router-dom";
import { signOut } from '../../utils/actions';
// import {profileImage} from '../../components/pages/Profile';

const Avatar = () => {
  const [url, setUrl] = useState(null); 
  const [hidden, setHidden] = useState(true);
  const dropdownRef = useRef();
  const [right, setRight] = useState('right-0');
  
    const getImage = async()=>{
      const response = await fetch('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
      const blob = await response.blob(); 
      // console.log(blob);
      setUrl(URL.createObjectURL(blob));
    };
  //  * For creating adjustable dropdown behaviour. 
  //  * Typically not needed now: I can directly set right-0 on the avatar dropdown for now to prevent an overflow
  //   useEffect(()=>{
  //     if(dropdownRef.current){
  //       const dropdown = dropdownRef.current;
  //       const dropdownRect = dropdown.getBoundingClientRect();
  //       const viewportHeight =  window.innerHeight;
  //       const viewportWidth =  window.innerWidth;
  //       if(dropdownRect.left + dropdownRect.width >= viewportWidth){
  //         console.log('dropdown has crossed the right part');
  //         setRight('right-0')
  //       }
  //     console.log(dropdown);
  //   }
  // });
  const handleClickOutside = (e)=>{
    // console.log(e.target);
   if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
     setHidden(true); 
   }
 };

 useEffect(()=>{
    getImage();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //  we have to remove the event listener when the element unmounts
    };
  }, [])
  return (
    <>
    {url &&
        <div ref={dropdownRef} className="flex items-center ms-3 relative">
        <div>
          <button
            type="button"
            onClick={()=>{setHidden(!hidden)}}
            className="flex text-sm bg-gray-800 rounded-full ring-1 ring-sky-500 ring-offset-2 dark:ring-offset-gray-800"
            aria-expanded="false"
            // data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            <img
              id="profileImage"
              className="min-w-8 h-8 rounded-full"
              src={url}
              alt="user photo"
            />
          </button>
        </div>
        {!hidden &&  
        <div
        className={`z-50 my-4 absolute top-6 ${right} text-base list-none bg-white divide-y divide-gray-100 rounded shadow-2xl dark:bg-gray-700 dark:divide-gray-600`}
        id="dropdown-user"
      >
        <div className="px-4 py-3" role="none">
          <p
            className="text-sm text-gray-900 dark:text-white"
            role="none"
          >
            {localStorage.getItem('username')}
          </p>
          <p
            className="text-sm font-bold text-gray-900 truncate dark:text-gray-300"
            role="none"
          >
            {localStorage.getItem('email')}
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <a
              href="/Profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Go to profile
            </a>
          </li>
        </ul>
        <ul className="py-1" role="none">
          <li onClick={signOut}>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>}
      
      </div>
    }
    
    {!url && <AvatarSkeleton/>}
    </>
  )
}

export default Avatar
