import React, {useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
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

  return (
    <>
      <div className='container'>
        <div className="row">
          <div className="editor">
            <ReactQuill theme='snow' value={value} 
              onChange={(text)=>{setValue(text)}}
              className='editor-input'
              modules={modules}
            />
          </div>
        </div>
       </div>

       <button className="button bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={createNote}>Save</button>
       <button className="button mx-2 bg-sky-500 p-1 rounded-md hover:bg-sky-700" onClick={getCredentials}>login</button>

       
    </>
  );
}

export default Edit;
