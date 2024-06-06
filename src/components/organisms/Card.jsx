import React from 'react'
import TimeDisplay from '../atoms/TimeDisplay'

const Card = ({ note }) => {
  return (

    <div className="w-5/12 flex flex-col max-w-72 bg-white border transition shadow-md shadow-slate-400 hover:shadow-2xl rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="p-4 md:p-10">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {note.title || 'Card title'}
            </h3>
            <p className="mt-2 text-gray-500 dark:text-neutral-400">
            {note.text || 'With supporting text below as a natural lead-in to additional content.'}
            </p>
            <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" href="#">
            {note.created && <TimeDisplay timeString={note.created} /> || 'Card link'}
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
            </a>
        </div>
    </div>
  )
}

export default Card
