import React, { useRef, useState} from 'react'
import { fetchData } from '../../utils/jsonServer';
import { DOMAIN } from '../../utils/global';
import { Link } from 'react-router-dom';

// ! BUG: changed the format for saving notes and this causes the backend server to crash when notes created prior to the change have to be searched 
// ! FIX: Those notes have to be resaved before they get converted to the required format (otherwise the backend server will crash)
// 

const SearchModal = ({openModal=true, setOpenModal}) => {
    const searchRef = useRef();
    const [results, setResults] = useState([]);
    // console.log('the results are', results);
    
    const getResults = async ()=>{
        const data = await fetchData(DOMAIN + `/api/search/?username=${localStorage.getItem('get_notes_for')}&q=${searchRef.current.value}`, {}); 
        setResults(data);
        console.log(data);
        
    }; 

    const debounce = (delay)=>{
        let timer;
        return function(...args) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            getResults.apply(this, args);
          }, delay);
        };
      };

    const handleSearch = debounce(800);

    const formatSearch = (item) => {
      const span = item.span; // start and end points in the full text where there is a match
      const text = item.text; // this is the full text we are searching through
      if(span[0] <= item.title.length + item.brief.length - 1){
        return(
          <>
          {text.slice(0, span[0])}<span className='font-bold text-sky-600 dark:text-yellow-300'>{text.slice(span[0], span[1])}</span>{text.slice(span[1], span[1] + item.title.length + 20) + ' ... '}
          </> 
        );
        
      }

      return(
        <>
          <span>{item.title} - </span> ... <span className='font-bold text-sky-600 dark:text-yellow-300'>{text.slice(span[0], span[1])}</span><span>{text.slice(span[1], span[1] + 25)}</span> ...
        </>
      );
    };

  return (
    <>
    {
      openModal &&
      <div tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex bg-black/40 fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2  rounded-t dark:border-gray-600">
                  {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    My Settings
                  </h3> */}
                  <button type="button"
                  onClick={()=>{setOpenModal(false)}}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
              <input
                type="text"
                autoFocus
                spellCheck={false}
                ref={searchRef}
                onInput={handleSearch}
                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Notes ..."/>
                 
                 
                {results.length > 0 && 
                <div className='p-2'>
                    <ul>
                        {results.map((item, index)=>
                            <li key={item + index} className='text-gray-900 rounded-lg p-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                               <Link to={"/edit/?note_id=" + item.id} reloadDocument>
                               {
                                  formatSearch(item)
                               }
                               {/* {item.text.slice(0, item.span[0])}<span className='font-bold text-sky-600 dark:text-yellow-300'>{item.text.slice(item.span[0], item.span[1])}</span>{item.text.slice(item.span[1])} */}
                               </Link> 
                            </li>
                        )}
                    </ul>
                </div>
                }
              </div>

              {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                  <button type="button"
                   className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
              </div> */}
          </div>
      </div>
   </div>
    } 
    </>
  )
}

export default SearchModal;