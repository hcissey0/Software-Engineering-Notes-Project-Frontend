import React from 'react'

// ! the following classes below are to help tailwind compile the css for them 
// ! Apparently it cannot dynamically compile them
const css = `
bg-green-100 bg-blue-100 bg-orange-100
text-green-800 text-blue-800 text-orange-800
`
 
const Badge = ({
    color='blue',
    text='default',
    size='sm',
    rounded=false
}) => {
  
    if (size === 'sm') {
        return (
          <span className={`bg-${color}-100 text-${color}-800  text-xs font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-900 dark:text-${color}-300`}>
              {text}
          </span>
        )
    }
    if (size === 'md') {
        return (
          <span className={`bg-${color}-100 text-${color}-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-900 dark:text-${color}-300`}>
              {text}
          </span>
        )
    }
    if (size === 'lg') {
        return (
          <span className={`bg-${color}-100 text-${color}-800 text-md font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-900 dark:text-${color}-300`}>
              {text}
          </span>
        )
    }

}

export default Badge
