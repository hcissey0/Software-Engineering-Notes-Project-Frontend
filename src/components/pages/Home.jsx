import { useEffect, useState } from "react"
import API from "../../utils/api"
import Card from "../organisms/Card";
import React from "react";

const Home = () => {
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function func() {
      const data = await API.status();
      setStatus(data.status)
      const notes = await API.getNotes();
      setNotes(notes);
    }
    func();
  }, [])
  return (
    <div className="flex gap-5 justify-center items-cente">
      <div className="max-w-1/2 flex justify-center items-center flex-wrap gap-7">
        {
          notes.map(
            (note) =>
            <Card key={note.id} note={note}/>
          )
        }
      </div>
    </div>
  )
}

export default Home
