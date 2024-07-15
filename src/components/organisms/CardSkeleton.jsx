import React from 'react'

const CardSkeleton = ({addClass=''}) => {
    return (
        // The div below is the whole card
        <div
          className={`${addClass}
          basis-1/4 p-4 cursor-pointer bg-white border border-transparent rounded-md shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
        >
          
         {/* title section  */}
          <div className="flex justify-between">
            <div className='h-3 w-2/3 animate-pulse rounded-md bg-gray-500'>
            </div>
            <div>
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-inherit dark:bg-inherit hover:bg-inherit rounded-lg focus:ring-0 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-5 aspect-square" viewBox="0 0 24 24" >
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                </path></svg>
    
              </button>
             
            </div>
          </div>
    
          {/* this is the text */}
          
            <div className="font-normal text-sm text-gray-700 dark:text-gray-400">
              <div className='h-3 w-1/2 bg-gray-500 mb-3 animate-pulse rounded-md'></div>
              <div className='h-3 w-1/3 bg-gray-500 animate-pulse rounded-md'></div>
            </div>
    
       
    
           {/* footer section */}
          <div className="flex items-center justify-between mt-4">
            <div className="w-20 h-3 bg-gray-400 animate-pulse rounded-md">
            
            </div>
               
            <div className="w-20 h-3 bg-gray-400 animate-pulse rounded-md">
            
            </div>
            
          </div>
        </div>
      );
}

export default CardSkeleton;

export const placeholderCards = (num)=>{
    const cards = [];
    for (let i = 0; i < num; i++) {
       cards.push(
        <CardSkeleton key={i}/>
       );
    }
    return cards;
  }
