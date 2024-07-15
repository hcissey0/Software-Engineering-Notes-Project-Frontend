import React, {useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import Card from '../organisms/Card';
import './edit.css'
import { DOMAIN, JSON_DOMAIN } from '../../utils/global';
import { truncateText } from '../../utils/global';
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../../utils/jsonServer';
import { placeholderCards } from '../organisms/CardSkeleton';

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
        [ "link", "image" ],
      ],
    };

// * Deltas may be useful later for parsing some stuff
function Edit() {
  // ! lots of bugs here (will be fixed later)
  const note = useLoaderData();
  const [value, setValue] = useState(note.content);
  const [title, setTitle] = useState(note.title || 'Untitled');
  const [notes, setNotes] = useState([]);
  const quillRef = useRef();
  const titleRef = useRef();

  useEffect(
    ()=>{
      const func = async()=>{
        const notes = await fetchData(DOMAIN + '/api/get-notes/', {auth: true}); 
        if(notes!=null)setNotes(notes);
      }
      func();
    }
  , []);

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

  const handleSave = async ()=>{
    const editor = quillRef.current.unprivilegedEditor; 
    const brief = truncateText(editor.getText()); 
    const note = {
      'author': localStorage.getItem('username'), 
      'title': titleRef.current.innerText || 'Untitled',
      'brief': brief, 
      'content': editor.getHTML()
    }
    const data = await fetchData(DOMAIN + '/api/create-note/', {method:'POST', body:note});
    console.log(data); 
    // const response = await fetch(DOMAIN + '/api/create-note/', {
    //   method: 'POST', 
    //   body:JSON.stringify(note),
    //   headers: {
    //     'Content-Type': 'application/json', 
    //   }
    // })

    // const data = await response.json(); 
    // console.log(data);
  };

  return (
    <>
     <div className='edit-container gap-2 items-start'>
      {notes.length == 0 && 
        <div className='p-2 w-1/4 flex flex-col gap-y-2'>
         {placeholderCards(5)} 
        </div>
      }

      {notes.length > 0 && 
          <div className="p-2 w-1/4 flex flex-col gap-y-2">
            {notes.map((note) => (
              <Card key={note.id} note={note}/>
            ))}
          </div>
        }
       {/* <div className="notes p-2">
        {notes.map((note)=><Card addClass='mb-2' note={note} key={note.id}/>)}
       </div> */}
     
      <div className='p-4 editor'>
        <div contentEditable ref={titleRef} className='outline-0 mb-2'>{title}</div>
            <ReactQuill
              // theme='snow'
              value={value}
              onChange={(text)=>{setValue(text)}}
              ref={quillRef}
              className='w-full'
              modules={modules}
            />

            <div>
            <button type="button" 
            onClick={handleSave}
            className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium mt-4 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
            </div>
       </div>
     </div>

       {/* <button className="button bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={createNote}>Save</button>
       <button className="button mx-2 bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={getCredentials}>login</button> */}

       
    </>
  );
}

export default Edit;
