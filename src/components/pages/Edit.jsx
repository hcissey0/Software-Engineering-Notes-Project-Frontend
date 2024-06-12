import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import Card from "../organisms/Card"


const Edit = () => {
  const [status, setStatus] = useState("");
  const [displayMode, setDisplayMode] = useState("grid");
  const [sortMode, setSortMode] = useState("date");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    async function func() {
      const data = await API.status();
      setStatus(data.status);
      const notes = await API.getNotes();
      setNotes(notes);
    }
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
    setNotes(notes)
  };
  return (
    <div className="text-black dark:text-white border flex overflow-auto">
      <div className={` border flex-[1] ${selectedNote ? 'hidden' : 'flex'} lg:flex flex-col`}>
        <div className="borde w-full flex justify-between items-center p-3">
          <div className="flex items-center gap-1">
            <p className="text-black opacity-50 text-xs dark:text-white">
              Sort by:
            </p>
            <form className="max-w-sm w-20">
              <select
                onChange={handleSortMode}
                id="underline_select"
                defaultValue={"date"}
                className="block py-2.5 px-0 w-fit text-xs text-gray-700 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
                    className="w-[24px] h-[24px]"
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
                    className="w-[24px] h-[24px] "
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
        </div>
        <div className="overflow-y-auto">
          {notes.map((note) => (
            <Card key={note.id} list={displayMode === 'list'} note={note} />
          ))}
        </div>
      </div>
      <div className={`border flex-[3] ${selectedNote ? 'flex' : 'hidden'} md:flex`}>edit area</div>
    </div>
  );
};

export default Edit;
