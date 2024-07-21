import React from "react";
import { useEffect, useState } from "react";
import Card from "../organisms/Card";
import './edit.css'
import { fromServers } from "../../utils/jsonServer";
import { placeholderCards } from "../organisms/CardSkeleton";
import { DOMAIN, JSON_DOMAIN } from "../../utils/global";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {
  const [status, setStatus] = useState("");
  const [displayMode, setDisplayMode] = useState("grid");
  const [sortMode, setSortMode] = useState("date");
  const [notes, setNotes] = useState(null);

  // get all notes
  useEffect(() => {
        /*
          I could have got the notes in the home loader but I want the card skeletons to show to represent no data
          The home loader will completely fetch all data before the page loads which is not desirable to us at this moment
          I'm using the home loader to check authentication instead to prevent the page from loading if the user is not authenticated
        */ 
      const func = async ()=>{
        const usernotes = await fromServers([DOMAIN + `/api/get-notes/?username=${localStorage.getItem('get_notes_for')}`, JSON_DOMAIN + '/get-notes/'], {auth:true}); // remove auth for when using json server (json server doesn't accept authorization)
        if(usernotes!=null)setNotes(usernotes);
      };
      func();
    
  }, []);

  const handleDisplayMode = (e) => {
    setDisplayMode(e.target.value);
  };

  const handleSortMode = (e) => {
    setSortMode(e.target.value);
    notes.sort((a, b) => {
      return new Date(a.created) - new Date(b.created);
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4">
      
      {/* * sorting  */}

      {/* <div className="borde w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-black opacity-40 dark:text-white">Sort by:</p>
          <form className="max-w-sm w-20">
            <select
              onChange={handleSortMode}
              id="underline_select"
              defaultValue={"date"}
              className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="label">Label</option>
              <option value="title">Title</option>
            </select>
          </form>
        </div>

        <div className="flex items-center">
          <ul className="flex items-center">
            <li>
              <input
                onChange={handleDisplayMode}
                type="radio"
                id="list-view"
                name="display"
                defaultValue="list"
                className="hidden peer"
              />
              <label
                htmlFor="list-view"
                className="flex items-center justify-between text-gray-500 bg-white border rounded-l-sm border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-[32px] h-[32px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                    d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </label>
            </li>
            <li>
              <input
                onChange={handleDisplayMode}
                type="radio"
                id="grid-view"
                name="display"
                defaultValue="grid"
                className="hidden peer"
                defaultChecked
              />
              <label
                htmlFor="grid-view"
                className="flex items-center justify-between text-gray-500 bg-white border rounded-r-sm border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-[32px] h-[32px] "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                    d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                  />
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div> */}

      {/* Displaying cards  */}

      {/* <div
        className={`transition-all duration-300 flex w-full justify-center items-center ${
          displayMode === "list" ? "flex-col" : "flex-wrap"
        } gap-2`}
      >
        {notes.map((note) => (
          <Card key={note.id} note={note} list={displayMode === "list"} />
        ))}
      </div> */}
      <Toaster />


      {(notes!= null && notes.length > 0) && 
        <div className="cards w-full">
          {notes.map((note) => (
            <Card key={note.id} note={note} list={displayMode === "list"} />
          ))}
        </div>
      }

      {notes == null && 
        <div className="cards w-full">
          {placeholderCards(5)}
        </div>
      }
      {(notes != null && notes.length == 0) && 
        <div className="w-full">
          No notes here you can click <Link to={"/edit/?add_note=true"} reloadDocument className="text-blue-700 hover:underline hover:underline-offset-4">here</Link> to create a new note
        </div>
      }

    </div>
  );
};

export default Home;
