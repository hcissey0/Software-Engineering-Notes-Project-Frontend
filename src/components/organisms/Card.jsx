import React from "react";
import TimeDisplay from "../atoms/TimeDisplay";
import Badge from "../atoms/Badge";
import moment from "moment";
import './Card.css';
import { Link } from "react-router-dom";
import { truncateText } from "../../utils/global";
import Dropdown from "./Dropdown";


const Card = ({ note, list = false, addClass=''}) => {

  const truncatedText = truncateText(note.brief);
  // // Call the function to truncate text to 30 words
  // truncateText('text-container', 30);
  return (
    // The div below is the whole card
    <div
      className={`${addClass} ${
        list ? "w-full" : ""
      } transition-all basis-1/4 block relative max-w-full p-4 cursor-pointer bg-white border border-transparent rounded-md shadow-sm hover:bg-sky-300/20  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      
     {/* title section  */}
      <div className="flex justify-between">
        <Link to={`/edit/?note_id=${note.id}`} reloadDocument className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
          {note.title || "Noteworthy technology acquisitions 2021"}
        </Link>

          <Dropdown link={note.id}/>
        
      </div>

      {/* this is the text */}
      <div className="text-container" id="text-container">
        <Link to={`/edit/?note_id=${note.id}`} reloadDocument className="font-normal text-sm text-gray-700 dark:text-gray-400">
        {/* {note.text |
          "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."} */}
          {truncatedText + '... '}
        </Link>

        {/* the truncated part */}

      </div>
      
      {/* <div className="truncate w-28">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Nostrum quo neque non, blanditiis in minima voluptates 
          consequatur iusto distinctio veniam commodi tempora voluptate voluptatum,
           ipsa deserunt exercitationem rem vel repellat?
      </div> */}

       {/* footer section */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-black opacity-45 dark:text-white text-xs">
          {moment(note.created).fromNow()}
        </div>
           
          {
            // if there's no label then we don't show the badge
          note.label && <div>
          <Badge rounded color="blue" text={note.label} />
          </div>
          }
        
      </div>
    </div>
  );
};

export default Card;
