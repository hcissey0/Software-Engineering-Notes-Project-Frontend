import React from "react";
import TimeDisplay from "../atoms/TimeDisplay";
import Badge from "../atoms/Badge";
import moment from "moment";

const Card = ({ note, list = false }) => {
  return (
    <div
      className={` ${
        list ? "w-full" : ""
      } transition-all max-w-ful p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      <div className="flex justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title || "Noteworthy technology acquisitions 2021"}
        </h5>
        <div>
          <button
            id={note.id}
            data-dropdown-toggle={"dropdown" + note.id}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-inherit dark:bg-inherit hover:bg-inherit rounded-lg focus:ring-0 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div
            id={"dropdown" + note.id}
            className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby={note.id}
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Separated link
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {note.text ||
          "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-black opacity-45 dark:text-white text-xs">
          {moment(note.created).fromNow()}
        </div>

        <div>
          <Badge rounded color="blue" text={note.label} />
        </div>
      </div>
    </div>
  );
};

export default Card;
