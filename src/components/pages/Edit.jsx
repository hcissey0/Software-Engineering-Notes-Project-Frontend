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
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder'; 
import { IconEye, IconLock, IconPencil } from '@tabler/icons-react';
import hljs from 'highlight.js';
import Spinner from '../organisms/Spinner';
import Underline from '@tiptap/extension-underline';
import LabelDropdown from '../organisms/LabelDropdown';
import AccessDropdown from '../organisms/AccessDropdown';
function Edit() {
  const lowlight = createLowlight();
 
  // register languages that you are planning to use
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  
const codeExample = 'for element in name'

// const highlighted = hljs.highlight(codeExample, {language: 'typescript'});
// console.log(highlighted);
// const content = '<p>Regular paragraph</p><pre><code>' + highlighted.value + '</code></pre>';
// console.log(content);

 
  const note = useLoaderData();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [title, setTitle] = useState(note? note.title: 'Untitled');
  const [noteId, setNoteId] = useState(note != null ? note.id: null);
  const author = useRef(note != null? note.author: localStorage.getItem('username')); // author does not change
  const [notes, setNotes] = useState(null);
  const titleRef = useRef();
  const editor = useEditor({
    extensions:[
        StarterKit.configure({codeBlock: false}), 
        Link,
        Underline,
        // CodeBlockLowlight.configure({ lowlight }),
        Placeholder.configure({placeholder:'Write something ...'})
    ], 
    content: note != null ? note.content:  '', 
    editable: note != null ? note.can_edit: true
  });

  useEffect(
    ()=>{
      // console.log('running');
      const func = async()=>{
        const notes = await fetchData(DOMAIN + `/api/get-notes/?username=${author.current}`, {auth: true}); 
        if(notes !=null)setNotes(notes);
      }
       if(saved){
         func();
         setSaved(false);
      }
    }
  , [saved]);

  const handleSave = async ()=>{
    let data;
    const brief = truncateText(editor.getText()); 
    const note = {
      'author': author.current, 
      'title': titleRef.current.innerText || 'Untitled',
      'brief': brief, 
      'label': 'Web Development',
      'content': editor.getHTML()
    }

    setSaving(true);
    if(noteId != null){ // if the noteId is not null it means the note already exists an so we just update it
      // console.log('this note already exists');
      // console.log(note);
      data = await fetchData(DOMAIN + `/api/update-note/${noteId}/` , {method:'PATCH', body: note})
      if(data != null){
        console.log(data);
        setSaving(false);
        setSaved(true)
      }
    }
    else{ // create a new note
      data = await fetchData(DOMAIN + '/api/create-note/', {method:'POST', body:note});
      if(data != null){
        setNoteId(data.id); // set note id to the current note
        setSaving(false);
        setSaved(true);
      }
    }
  
  };

  return (
    <>
     <div className='edit-container gap-12 items-start'>
      {notes == null &&
        <div className='p-2 w-1/4 flex flex-col gap-y-2'>
         {placeholderCards(2)} 
        </div>
      }

    {(notes != null && notes.length == 0) && 
        <div className="p-2 w-1/4">
          Your notes will appear here
        </div>
      }

      {(notes != null && notes.length > 0) && 
          <div className="p-2 w-1/4 flex flex-col gap-y-2 h-[600px] overflow-y-auto" style={{scrollbarWidth: 'thin'}}>
            {notes.map((note) => (
              <Card key={note.id} note={note}/>
            ))}
          </div>
        }
      
     
      <div className='p-4 editor'>
        <table className='table-auto border-separate'>
             <tbody>
                <tr>
                <td>
                  <div className='font-bold text-gray-700 me-4'>Title</div>
                </td>
                <td>
                  <div contentEditable={note != null? note.can_edit: true} ref={titleRef} className='outline-0 font-bold'>{title}</div>
                </td>
              </tr>
                
                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Author</div>
                </td>
                <td>
                  <Badge rounded color="gray" text={note != null && note.author != localStorage.getItem('username')? note.author: localStorage.getItem('username') + ' (You)'} />
                </td>
                </tr>
                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Label</div>
                </td>
                <td>
                  {/* <Badge rounded color="blue" text={(note != null && note.label)? note.label : 'empty'} /> */}
                  <LabelDropdown/>
                </td>
                </tr>
             
                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Access</div>
                </td>
                <td>
                  {/* <div className='inline-flex items-center'>
                  <Badge rounded color="green" text='Private' />
                  <IconLock className='w-5 h-5'/>
                  </div> */}

                  <AccessDropdown/>

                </td>
                </tr>

                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Permission</div>
                </td>
                <td>
                  <div className='inline-flex items-center'>
                  {(note == null || note.can_edit) && 
                  <>
                  <Badge rounded color="green" text='Read-Write' />
                  <IconPencil className='w-5 h-5'/>
                  </>
                  }

                  {(note != null && !note.can_edit) && 
                  <>
                    <Badge rounded color="orange" text='Read-Only' />
                    <IconEye className='w-5 h-5'/>
                  </>
                  }
                  </div>
                </td>
                </tr>
             </tbody>
        </table>
        <div className={`${saving? 'opacity-1': 'opacity-0'}`}>
           <Spinner/>
        </div>
        {/* <div className="mb-3 px-2">
            <div className='flex gap-3 items-center'>
              <div className='font-bold text-gray-700'>Title</div>
              <div contentEditable ref={titleRef} className='outline-0 font-bold'>{title}</div>
            </div>
            
            <div className='flex gap-3 items-center'>
              <div className='font-bold text-gray-700'>Label</div>
              <Badge rounded color="blue" text={note.label ?? 'empty'} />
            </div>
        </div> */}
            <Mantine editor={editor}/>
          {(note == null || note.can_edit) &&
            <div>
            <button type="button" 
            onClick={handleSave}
            className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium mt-4 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
            </div>
          }
       </div>
     </div>

       {/* <button className="button bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={createNote}>Save</button>
       <button className="button mx-2 bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={getCredentials}>login</button> */}

       
    </>
  );
}

export default Edit;
