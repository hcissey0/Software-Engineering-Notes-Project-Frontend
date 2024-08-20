import { IconX } from '@tabler/icons-react';
import React from 'react'

// ! the following classes below are to help tailwind compile the css for them 
// ! Apparently it cannot dynamically compile them
const css = `
bg-green-100 bg-blue-100 bg-orange-100 
bg-pink-100 bg-indigo-100 bg-purple-100 
bg-red-100 bg-yellow-100 bg-stone-100 bg-sky-100

additional bg for testing

bg-green-400 bg-blue-400 bg-orange-400 
bg-pink-400 bg-indigo-400 bg-purple-400 
bg-red-400 bg-yellow-400 bg-stone-400 bg-sky-400

dark styles

dark:bg-green-400 dark:bg-blue-400 dark:bg-orange-400 
dark:bg-pink-400 dark:bg-indigo-400 dark:bg-purple-400 
dark:bg-red-400 dark:bg-yellow-400 dark:bg-stone-400 dark:bg-sky-700

text-green-800 text-blue-800 text-orange-800
text-pink-800 text-indigo-800 text-purple-800
text-red-800 text-yellow-800 text-stone-800 text-sky-800

text-nowrap
`
 
const Badge = ({
    color='blue',
    text='default',
    size='sm',
    rounded=false,
    cancelButton=false,
    cancelFunc
}) => {
  
    // if (size === 'sm') {
        return (
          <span className={`inline-flex items-center bg-${color}-100 text-${color}-800 dark:text-black text-nowrap text-xs max-w-full truncate font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-400`}>
              {text}
              {cancelButton && 
              <button onClick={cancelFunc}>
                  <IconX className='w-5 h-5'/>
              </button>
              }
          </span>
        )
    // }
    // if (size === 'md') {
    //     return (
    //       <span className={`bg-${color}-100 text-${color}-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-900 dark:text-${color}-300`}>
    //           {text}
    //       </span>
    //     )
    // }
    // if (size === 'lg') {
    //     return (
    //       <span className={`bg-${color}-100 text-${color}-800 text-md font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-900 dark:text-${color}-300`}>
    //           {text}
    //       </span>
    //     )
    // }

}; 

export default Badge
