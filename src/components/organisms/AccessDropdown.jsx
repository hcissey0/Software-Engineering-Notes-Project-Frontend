import React from "react";
import Badge from "../atoms/Badge";
import { useState, useRef, useEffect } from "react";
import { IconCheck, IconLock, IconLockOpen } from "@tabler/icons-react";
import { fetchData } from "../../utils/jsonServer";
import { DOMAIN } from "../../utils/global";

const AccessDropdown = ({ note, onChange}) => {
  const accessChoices = [
    { name: "private", color: "green" },
    { name: "public", color: "orange" },
  ];
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const [chosen, setChosen] = useState( note == null || note.private ? accessChoices[0] : accessChoices[1]);
  
  useEffect(()=>{
    onChange(chosen)
  }, [chosen])
 

  const handleClick = () => {
    if (localStorage.getItem('username') != localStorage.getItem('get_notes_for')) return;
    setOpen(!open);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); //  we have to remove the event listener when the element unmounts
    };
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div onClick={handleClick} className="cursor-pointer inline-flex items-center">
          <Badge rounded color={chosen.color} text={chosen.name} />

          {chosen.name == "public" && (
            <div>
              <IconLockOpen className="w-5 h-5" />
            </div>
          )}
          {chosen.name == "private" && (
            <div>
              <IconLock className="w-5 h-5" />
            </div>
          )}
        </div>

        {open && (
          <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 absolute left-4 top-8 rounded-md shadow-lg w-44 dark:bg-gray-700">
            <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {accessChoices.map((access, index) => (
                <li key={index} className="mb-2 hover:bg-gray-100 cursor-pointer p-1 flex justify-between" onClick={()=>{setChosen(access)}}>
                  <Badge rounded text={access.name} color={access.color} />
                  {chosen.name == access.name && (
                    <div>
                      <IconCheck className="w-5 h-5" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AccessDropdown;
