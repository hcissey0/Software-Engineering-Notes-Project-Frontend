import React from 'react'

// ! the following classes below are to help tailwind compile the css for them 
// ! Apparently it cannot dynamically compile them
const css = `
bg-green-100 bg-blue-100 bg-orange-100 
bg-pink-100 bg-indigo-100 bg-purple-100 
bg-red-100 bg-yellow-100 bg-stone-100 bg-sky-100

dark styles

dark:bg-green-700 dark:bg-blue-700 dark:bg-orange-700 
dark:bg-pink-700 dark:bg-indigo-700 dark:bg-purple-700 
dark:bg-red-700 dark:bg-yellow-700 dark:bg-stone-700 dark:bg-sky-700

text-green-800 text-blue-800 text-orange-800
text-pink-800 text-indigo-800 text-purple-800
text-red-800 text-yellow-800 text-stone-800 text-sky-800


`
 
const Badge = ({
    color='blue',
    text='default',
    size='sm',
    rounded=false
}) => {
  
    // if (size === 'sm') {
        return (
          <span className={`bg-${color}-100 text-${color}-800 text-nowrap text-xs font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-700 dark:text-${color}-300 dark:text-gray-300`}>
              {text}
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
