import React, {useEffect, useState, useRef } from 'react';
import "react-quill/dist/quill.snow.css";
import Card from '../organisms/Card';
import './edit.css'
import { DOMAIN, JSON_DOMAIN } from '../../utils/global';
import { truncateText } from '../../utils/global';
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../../utils/jsonServer';
import { placeholderCards } from '../organisms/CardSkeleton';
import Mantine from '../organisms/Mantine';
import Badge from '../atoms/Badge';
import { useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Link } from '@mantine/tiptap';
import Placeholder from '@tiptap/extension-placeholder'

function Edit() {
  // ! lots of bugs here (will be fixed later)
  const note = useLoaderData();
  const [value, setValue] = useState(note.content);
  const [title, setTitle] = useState(note.title || 'Untitled');
  const [notes, setNotes] = useState([]);
  const quillRef = useRef();
  const titleRef = useRef();
  const editor = useEditor({
    extensions:[
        StarterKit, 
        Link,
        Placeholder.configure({placeholder:'Write something ...'})
    ], 
    content: note.content ?? '', 
  });

  useEffect(
    ()=>{
      localStorage.removeItem('current_note'); // remove existing current id's 
      if(note.id){ // if it's an existing note then we store it's id so that we just update it
        localStorage.setItem('current_note', note.id);
      }
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
    let data;
    const brief = truncateText(editor.getText()); 
    const note = {
      'author': localStorage.getItem('username'), 
      'title': titleRef.current.innerText || 'Untitled',
      'brief': brief, 
      // 'label': 'Education',
      'content': editor.getHTML()
    }
    // if this current note has already been saved then we just perform update functions instead
    if(localStorage.getItem('current_note')){
      console.log('this note already exists');
      console.log(note);
      data = await fetchData(DOMAIN + `/api/update-note/${localStorage.getItem('current_note')}/` , {method:'PATCH', body: note})
      if(data != null){
        console.log(data);
      }
    }
    else{ // create a new note
      data = await fetchData(DOMAIN + '/api/create-note/', {method:'POST', body:note});
      if(data != null){
        localStorage.setItem('current_note', data.id)
      }
    }
  };

  return (
    <>
     <div className='edit-container gap-2 items-start'>
      {notes.length == 0 && 
        <div className='p-2 w-1/4 flex flex-col gap-y-2'>
         {placeholderCards(2)} 
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
        <div className="mb-3 px-2">
            <div className='flex gap-3 items-center'>
              <div className='font-bold text-gray-700'>Title</div>
              <div contentEditable ref={titleRef} className='outline-0 font-bold'>{title}</div>
            </div>
            
            <div className='flex gap-3 items-center'>
              <div className='font-bold text-gray-700'>Label</div>
              <Badge rounded color="blue" text={note.label ?? 'empty'} />
            </div>
        </div>
            <Mantine editor={editor}/>
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
