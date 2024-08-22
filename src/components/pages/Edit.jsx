import React, { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../organisms/Card";
import "./edit.css";
import { DOMAIN, FRONTEND_DOMAIN} from "../../utils/global";
import { truncateText } from "../../utils/global";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../utils/jsonServer";
import { placeholderCards } from "../organisms/CardSkeleton";
import Mantine from "../organisms/Mantine";
import Badge from "../atoms/Badge";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { IconAsterisk, IconDots, IconEye, IconPencil, IconShare, IconStar } from "@tabler/icons-react";
import Spinner from "../organisms/Spinner";
import Underline from "@tiptap/extension-underline";
import LabelDropdown from "../organisms/LabelDropdown";
import AccessDropdown from "../organisms/AccessDropdown";
import moment from "moment";
import InviteModal from "../organisms/InviteModal";
import { addToFavs } from "../organisms/Dropdown";
import Highlight from "@tiptap/extension-highlight";
import toast from "react-hot-toast";

function Edit() {
  const note = useLoaderData();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link,
      Underline,
      Highlight, 
      Placeholder.configure({ placeholder: "Write something ..." }),
    ],
    content: note != null ? (typeof note.content == 'string'? note.content: note.content.html): "",
    editable: note != null ? note.can_edit : true,
  });

  

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [title, setTitle] = useState(note != null? note.title: 'Untitled');
  const [label, setLabel] = useState(note != null? note.label: null);
  const [fav, setFav] = useState(note == null? false: note.favorite);
  const [access, setAccess] = useState(null);
  const [noteId, setNoteId] = useState(note != null ? note.id: null);
  const author = useRef(note != null? note.author: localStorage.getItem('username')); // author does not change
  const [notes, setNotes] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [modified, setModified] = useState(note != null? note.modified: null)
  const [content, setContent] = useState(editor.getHTML())
  const originalContent = useRef(content)
  const originalLabel = useRef(label ?? {}) // originalLabel might be null (label is set within the LabelDropdown component so it won't be null but originalLabel will)
  const originalAccess = useRef(note != null? (note.private ? 'private': 'public'): 'private') // this is a mere sting value as opposed to access which is an object
  const titleRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    const handlePaste = (event) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      const html = event.clipboardData.getData('text/html');
      // handle the case for when it is copied from the navbar
      if(!text.includes('/edit/?note_id=') || (text.includes('/edit/?note_id=') && html != '') ){
        localStorage.removeItem('copied_note_title')
      }
      if (localStorage.getItem('copied_note_title')) {
            editor.commands.undo() // undo the initial pasting
            const title = localStorage.getItem('copied_note_title');
            editor.commands.insertContent(`<a href="${text}">${title}</a>`); // put our own pasted content
      }
    };

    editor.view.dom.addEventListener('paste', handlePaste);

    return () => {
      editor.view.dom.removeEventListener('paste', handlePaste);
    };
  }, []);


  useEffect(()=>{
    if(note != null)
      {  
        if(label != null && access != null){
          console.log(originalAccess.current);
          setIsEdited(content != originalContent.current || label.id != originalLabel.current.id || access.name != originalAccess.current);
        }
        else{
          setIsEdited(content != originalContent.current);
        }
      }
  }, [content, label, access])


const handleContentChange = (newContent)=>{
  setContent(newContent);
}


  useEffect(() => {
    const func = async () => {
      const notes = await fetchData(DOMAIN + `/api/get-notes/?username=${author.current}`, { auth: true });
      if (notes != null)
        if (localStorage.getItem('username') != localStorage.getItem('get_notes_for'))
          setNotes(notes.filter(note => !(note.private) || note.can_read));
        else
          setNotes(notes);
    };
    if (saved) {
      func();
      setSaved(false);
    }
  }, [saved]);
  
  const toggleFavourite = async ()=>{
    await addToFavs(note, !fav);
    setSaved(true);
    setFav(!fav);
  }
  const handleLabelChange = (label)=>{
    setLabel(label);
  }

  const handleAccessChange = (access)=>{
    setAccess(access)
  }

  const handleSave = async () => {
    let data;
    const brief = truncateText(editor.getText());
    const note = {
      author: author.current,
      title: titleRef.current.innerText || "Untitled",
      brief: brief,
      label: label.title != 'empty'? {...label, labelId:label.id}:null,
      private: access.name == 'private',
      // content: editor.getHTML()
      content: {html: editor.getHTML(), text: editor.getText()}
    };
    setSaving(true);
    if (noteId != null) {
      // if the noteId is not null it means the note already exists an so we just update it
      // console.log('this note already exists');
      // console.log(note);
      // data = await fetchData(DOMAIN + `/api/test/`, { method: "POST", body: note });
      // return;
      data = await fetchData(DOMAIN + `/api/update-note/${noteId}/`, { method: "PATCH", body: note });
      if (data != null) {
        setSaving(false);
        toast.success('saved successfully'); // may not be required for autosave
        setSaved(true);
        setIsEdited(false);
        setModified(data.modified)
        originalContent.current = data.content;
        originalLabel.current = data.label;
        originalAccess.current = data.private? 'private': 'public';
      }
    } else {
      // create a new note
      data = await fetchData(DOMAIN + "/api/create-note/", { method: "POST", body: note });
      if (data != null) {
        setNoteId(data.id); // set note id to the current note
        setSaving(false);
        setSaved(true);
      }
    }
  };

  return (
    <>
     <InviteModal openModal={openModal} setOpenModal={setOpenModal} note={note} />
     <div className='edit-container gap-4 items-start'>
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
          <div className="p-2 w-1/4 flex flex-col gap-y-2" style={{scrollbarWidth: 'thin'}}>
            {notes.map((note) => (
              <Card key={note.id} note={note} onChange={()=>{setSaved(true)}} />
            ))}
          </div>

        }
      
     
      <div className='p-4 editor flex'>
        <div className="flex-grow px-2">
            <table className='table-auto border-separate'>
                <tbody>
                    <tr>
              
                    <td>
                      <div className="font-bold text-gray-700 dark:text-white me-4">Title</div>
                    </td>
                    <td className="flex gap-3">
                      <div contentEditable={note != null ? note.can_edit : true} ref={titleRef} className="outline-0 font-bold">
                        {title}
                      </div>
                      {isEdited && 
                      // <p className="text-sm">(Unsaved changes)</p>
                      <IconAsterisk className="w-3 h-3"/>
                      // * will probably use a star icon here (maybe positioned absolutely but relative to the title div) 
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="font-bold text-gray-700 dark:text-white">Author</div>
                    </td>
                    <td>
                      <div className="text-sm">
                        {note != null && note.author != localStorage.getItem("username") ? note.author : localStorage.getItem("username") + " (You)"}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="font-bold text-gray-700 dark:text-white">Label</div>
                    </td>
                    <td>
                      <LabelDropdown label={label} note={note} onChange={handleLabelChange}/>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="font-bold text-gray-700 dark:text-white">Access</div>
                    </td>
                    <td>
                      {/* <div className='inline-flex items-center'>
                      <Badge rounded color="green" text='Private' />
                      <IconLock className='w-5 h-5'/>
                      </div> */}

                      <AccessDropdown note={note} onChange={handleAccessChange}/>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="font-bold text-gray-700 dark:text-white">Permission</div>
                    </td>
                    <td>
                      <div className="inline-flex items-center">
                        {(note == null || note.can_edit) && (
                          <>
                            <Badge rounded color="green" text="Read-Write" />
                            <IconPencil className="w-5 h-5" />
                          </>
                        )}

                        {note != null && !note.can_edit && (
                          <>
                            <Badge rounded color="orange" text="Read-Only" />
                            <IconEye className="w-5 h-5" />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={`${saving ? "opacity-1" : "opacity-0"}`}>
                <Spinner text="Saving ..." />
              </div>
              <Mantine editor={editor} onChange={handleContentChange} note={note}/>
              {(note == null || note.can_edit) && (
                <div>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium mt-4 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Save
                  </button>
                </div>
              )}
        </div>

        <div className="absolute right-8">
                <div className="flex gap-3">
                  {modified != null &&
                    <div className="text-sm">
                       <span className="text-nowrap">Edited {moment(modified).fromNow()}</span>
                    </div>
                  }
                  
                   <button onClick={()=>{setOpenModal(true)}}>
                    <IconShare className="w-5 h-5"/>
                   </button>
                   {/* ! caution note will be null in some cases below I'll fix that later */}
                   <IconStar onClick={toggleFavourite} className={`w-5 h-5 cursor-pointer ${note!=null && fav? 'fill-black dark:fill-gray-400': ''}`}/>
                   <IconDots className="w-5 h-5"/>
                </div>
{/*                 {note != null && 
                
                <div class="flex -space-x-4 rtl:space-x-reverse mt-4">
                  <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                  <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt=""/>
                  <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt=""/>
                  <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+4</a>
                </div>
                } */}
        </div>
        </div>

      </div>

    </>
  );
}

export default Edit;
