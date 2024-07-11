import React from 'react'

const Badge = ({
    color='blue',
    text='default',
    size='sm',
    rounded=false
}) => {

    if (size === 'sm') {
        return (
          <span className={`bg-blue-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded${rounded ? '-full': ''} dark:bg-${color}-900 dark:text-${color}-300`}>
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
