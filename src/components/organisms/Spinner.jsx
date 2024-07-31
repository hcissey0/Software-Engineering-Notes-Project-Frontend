import React from 'react'
import './spinner.css'
const Spinner = ({text='', width='6'}) => {
  return (
    <>
    <div className='flex items-center gap-3'>
      <span className={`loader w-${width} h-${width}`}></span>
      <span className='text-sm'>{text}</span>
    </div>
    </>


  )
}

export default Spinner