import React from 'react'
import './spinner.css'
const Spinner = ({text=''}) => {
  return (
    <>
    <div className='flex items-center gap-3'>
      <span className="loader w-6 h-6"></span>
      <span className='text-sm'>{text}</span>
    </div>
    </>


  )
}

export default Spinner