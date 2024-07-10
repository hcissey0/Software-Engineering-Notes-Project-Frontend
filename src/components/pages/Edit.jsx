import React, {useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import Card from '../organisms/Card';
import moment from "moment";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './edit.css'

    const modules = {
      toolbar : [
        [ {header : [ 1, 2, 3, 4, 5, 6, false ]} ],
        [ {font : []} ],
        [ {size : []} ],
        [ "bold", "italic", "underline", "strike", "blockquote" ],
        [
          {list : "ordered"},
          {list : "bullet"},
          {indent : "-1"},
          {indent : "+1"},
        ],
        [ "link", "image", "video" ],
      ],
    };

function Edit() {
  const[value, setValue] = useState("");
  const domain = 'http://192.168.110.101:8000';
  
  const createNote = async ()=>{
     const response = await fetch( domain + '/api/create-note/', {
      method: 'POST', 
      body:JSON.stringify({
        'text': value,
        'author': 'james',
      }),
      headers:{'Content-Type': 'application/json'}
     });
     const data = await response.json();
     console.log(data);
  };

  const getCredentials = async ()=> {
    const response = await fetch(domain + '/api/token/',{
      method: 'POST',
      body:JSON.stringify({username: 'james', password: 'easytoguess'}),
      headers:{'Content-Type': 'application/json'}
    });

    const data = await response.json();
    // console.log(data)
    localStorage.setItem('user_token', data.access)
  };

  const notes = [
    {
      id : '1',
      title : 'Python as a note',
      label : 'code',
      author : '1',
      text : 'Python is a programming language',
      created : '2021-10-10T12:00:00.000Z',
      modified : '2021-10-10T12:00:00.000Z',
    },
    {
      id : '2',
      title : 'JavaScript as a note',
      label : 'Education',
      author : '1',
      text : 'JavaScript is a programming language',
      created : '2021-11-10T12:00:00.000Z',
      modified : '2021-11-10T12:00:00.000Z',
    }
  ];


  return (
    <>
     <div className='edit-container'>
       <div className="notes">
        {notes.map((note)=><Card note={note} key={note.id}/>)}
       </div>
       
      <div className='border editor'>
        <div className=" border border-blue-500 ">
          <div className="">
            <ReactQuill theme='snow' value={value} 
              onChange={(text)=>{setValue(text)}}
              className='w-full min-h-[80vh]'
              modules={modules}
            />
          </div>
        </div>
       </div>
     </div>

       <button className="button bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={createNote}>Save</button>
       <button className="button mx-2 bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={getCredentials}>login</button>

       
    </>
  );
}

export default Edit;
