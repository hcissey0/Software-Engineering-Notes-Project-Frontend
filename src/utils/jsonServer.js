// ! Run json server first on port 3000 (This is the default port anyway)
// * All sample data in api.json is an actual representation of how data looks like from the actual server


// get all notes from json server
export const getNotes = async (user)=>{
  const response = await fetch('http://127.0.0.1:3000/get-notes/');
  const notes = await response.json(); 
  return user? notes.filter((note)=>note.author == user): notes;  // filter notes for a particular user or return all notes
};