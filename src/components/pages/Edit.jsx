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
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState(note? note.title: 'Untitled');
  const [notes, setNotes] = useState([]);
  const quillRef = useRef();
  const titleRef = useRef();
  const editor = useEditor({
    extensions:[
        StarterKit.configure({codeBlock: false}), 
        Link,
        Underline,
        CodeBlockLowlight.configure({ lowlight }),
        Placeholder.configure({placeholder:'Write something ...'})
    ], 
    content: note? note.content:  '', 
    editable: note? note.can_edit: true
  });

  useEffect(
    ()=>{
      localStorage.removeItem('current_note'); // remove existing current id's 
      if(note !== null && note.id){ // if it's an existing note then we store it's id so that we just update it
        localStorage.setItem('current_note', note.id);
      }
      const func = async()=>{
        if(note == null)localStorage.setItem('get_notes_for', localStorage.getItem('username'))
        const notes = await fetchData(DOMAIN + `/api/get-notes/?username=${localStorage.getItem('get_notes_for')}`, {auth: true}); 
        if(notes!=null)setNotes(notes);
      }
      func();
    }
  , []);

  const handleSave = async ()=>{
    let data;
    const brief = truncateText(editor.getText()); 
    const note = {
      'author': localStorage.getItem('username'), 
      'title': titleRef.current.innerText || 'Untitled',
      'brief': brief, 
      'label': 'Web Development',
      'content': editor.getHTML()
    }
    // if this current note has already been saved then we just perform update functions instead
    setSaving(true);
    if(localStorage.getItem('current_note')){
      console.log('this note already exists');
      console.log(note);
      data = await fetchData(DOMAIN + `/api/update-note/${localStorage.getItem('current_note')}/` , {method:'PATCH', body: note})
      if(data != null){
        console.log(data);
        setSaving(false);
      }
    }
    else{ // create a new note
      data = await fetchData(DOMAIN + '/api/create-note/', {method:'POST', body:note});
      if(data != null){
        localStorage.setItem('current_note', data.id)
        setSaving(false);
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
          <div className="p-2 w-1/4 flex flex-col gap-y-2 max-h-[600px] overflow-y-auto" style={{scrollbarWidth: 'thin'}}>
            {notes.map((note) => (
              <Card key={note.id} note={note}/>
            ))}
          </div>
        }
       {/* <div className="notes p-2">
        {notes.map((note)=><Card addClass='mb-2' note={note} key={note.id}/>)}
       </div> */}
     
      <div className='p-4 editor'>
        <table className='table-auto border-separate'>
             <tbody>
                <tr>
                <td>
                  <div className='font-bold text-gray-700 me-4'>Title</div>
                </td>
                <td>
                  <div contentEditable={note? note.can_edit: true} ref={titleRef} className='outline-0 font-bold'>{title}</div>
                </td>
              </tr>
                
                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Author</div>
                </td>
                <td>
                  <Badge rounded color="gray" text={note? note.author: localStorage.getItem('username')} />
                </td>
                </tr>
                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Label</div>
                </td>
                <td>
                  <Badge rounded color="blue" text={note && note.label? note.label : 'empty'} />
                </td>
                </tr>
             
                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Status</div>
                </td>
                <td>
                  <div className='inline-flex items-center'>
                  <Badge rounded color="green" text='Private' />
                  <IconLock className='w-5 h-5'/>
                  </div>
                </td>
                </tr>

                <tr>
                <td>
                 <div className='font-bold text-gray-700'>Access</div>
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
