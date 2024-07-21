import React from "react";
import Badge from "../atoms/Badge";
import { useState, useRef, useEffect } from "react";
import { IconCheck, IconLock, IconLockOpen } from "@tabler/icons-react";
import { fetchData } from "../../utils/jsonServer";
import { DOMAIN } from "../../utils/global";
import toast from "react-hot-toast";

const AccessDropdown = ({ note }) => {
  const [open, setOpen] = useState(false);
  const accessChoices = [
    { name: "Private", color: "green" },
    { name: "Public", color: "orange" },
  ];

  let defaultChosen;
  if (note != null) {
    defaultChosen = note.private ? accessChoices[0] : accessChoices[1];
  } else {
    defaultChosen = accessChoices[0];
  }

  const [chosen, setChosen] = useState(defaultChosen);
  const dropdownRef = useRef();

  const handleClick = () => {
    if (localStorage.getItem('username') != localStorage.getItem('get_notes_for')) return;
    setOpen(!open);
  };

  const handleClickOutside = (e) => {
    // console.log(e.target);
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

  async function handleAccessChange(access) {
    if (chosen.name == access.name) return;
    if (note == null) {
      toast.error("Save note first");
      return;
    }
    setChosen(access);
    console.log("sds");
    // make a request ot the backend server to change the access.
    const newNote = { ...note, private: access === accessChoices[0] };
    const response = await fetchData(DOMAIN + "/api/update-note/" + note.id + "/", { method: "PATCH", body: newNote, returnResponse: true });
    if (response.ok) toast.success(`This note is now ${access.name.toLowerCase()}`);
    else toast.error("Failed to update note access");
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div onClick={handleClick} className="cursor-pointer inline-flex items-center">
          <Badge rounded color={chosen.color} text={chosen.name} />

          {chosen.name == "Public" && (
            <div>
              <IconLockOpen className="w-5 h-5" />
            </div>
          )}
          {chosen.name == "Private" && (
            <div>
              <IconLock className="w-5 h-5" />
            </div>
          )}
        </div>

        {open && (
          <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 absolute left-4 top-8 rounded-md shadow-lg w-44 dark:bg-gray-700">
            <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {accessChoices.map((access) => (
                <li className="mb-2 hover:bg-gray-100 cursor-pointer p-1 flex justify-between" onClick={() => handleAccessChange(access)}>
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
