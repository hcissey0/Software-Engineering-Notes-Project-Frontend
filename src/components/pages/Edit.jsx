import React, { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../organisms/Card";
import "./edit.css";
import { DOMAIN, JSON_DOMAIN } from "../../utils/global";
import { truncateText } from "../../utils/global";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../utils/jsonServer";
import { placeholderCards } from "../organisms/CardSkeleton";
import Mantine from "../organisms/Mantine";
import Badge from "../atoms/Badge";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { IconAsterisk, IconEye, IconLock, IconPencil } from "@tabler/icons-react";
import hljs from "highlight.js";
import Spinner from "../organisms/Spinner";
import Underline from "@tiptap/extension-underline";
import LabelDropdown from "../organisms/LabelDropdown";
import AccessDropdown from "../organisms/AccessDropdown";
function Edit() {
  const note = useLoaderData();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link,
      Underline,
      Placeholder.configure({ placeholder: "Write something ..." }),
    ],
    content: note != null ? note.content : "",
    editable: note != null ? note.can_edit : true,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [title, setTitle] = useState(note != null? note.title: 'Untitled');
  const [label, setLabel] = useState(note != null? note.label: null)
  const [noteId, setNoteId] = useState(note != null ? note.id: null);
  const author = useRef(note != null? note.author: localStorage.getItem('username')); // author does not change
  const [notes, setNotes] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [content, setContent] = useState(editor.getHTML())
  const originalContent = useRef(content)
  const originalLabel = useRef(label)
  const titleRef = useRef();
  
  useEffect(()=>{
    setIsEdited(content != originalContent.current || label.id != originalLabel.current.id)
  }, [content, label])


const handleContentChange = (newContent)=>{
  setContent(newContent);
}


  useEffect(() => {
    const func = async () => {
      const notes = await fetchData(DOMAIN + `/api/get-notes/?username=${author.current}`, { auth: true });
      if (notes != null)
        if (localStorage.getItem('username') != localStorage.getItem('get_notes_for'))
          setNotes(notes.filter(note => !(note.private)));
        else
          setNotes(notes);
    };
    if (saved) {
      func();
      setSaved(false);
    }
  }, [saved]);
  
  
  const handleLabelChange = (label)=>{
    setLabel(label);
  }
  const handleSave = async () => {
    let data;
    const brief = truncateText(editor.getText());
    const note = {
      author: author.current,
      title: titleRef.current.innerText || "Untitled",
      brief: brief,
      label: label.title != 'empty'? {...label, labelId:label.id}:null,
      content: editor.getHTML(),
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
        setSaved(true);
        setIsEdited(false);
        originalContent.current = data.content
        originalLabel.current = data.label
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
              <Card key={note.id} note={note} />
            ))}
          </div>

        }
      
     
      <div className='p-4 editor'>
        <table className='table-auto border-separate'>
             <tbody>
                <tr>
          
                <td>
                  <div className="font-bold text-gray-700 me-4">Title</div>
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
                  <div className="font-bold text-gray-700">Author</div>
                </td>
                <td>
                  <Badge
                    rounded
                    color="gray"
                    text={note != null && note.author != localStorage.getItem("username") ? note.author : localStorage.getItem("username") + " (You)"}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="font-bold text-gray-700">Label</div>
                </td>
                <td>
                  <LabelDropdown label={label} onChange={handleLabelChange}/>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="font-bold text-gray-700">Access</div>
                </td>
                <td>
                  {/* <div className='inline-flex items-center'>
                  <Badge rounded color="green" text='Private' />
                  <IconLock className='w-5 h-5'/>
                  </div> */}

                  <AccessDropdown note={note}/>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="font-bold text-gray-700">Permission</div>
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
          <Mantine editor={editor} onChange={handleContentChange} content={originalContent.current} />
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
      </div>

    </>
  );
}

export default Edit;
