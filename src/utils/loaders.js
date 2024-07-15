import { redirect } from "react-router-dom";
import { DOMAIN } from "./global";
import { fetchData } from "./jsonServer";

export const getAccessToken = ()=>{
    return localStorage.getItem('user_access_token'); 
};


const userIsAuthenticated = async()=>{
 const accessToken = getAccessToken();
 if(!accessToken){
    return false; // if the user has no access token then we return early
 }


 // a token may exist but may have expired so we check that
 try {
     const response = await fetch(DOMAIN + '/api/check-token/', {
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
     })
    
     const data = await response.json();
     console.log(data);
     // if token has expired then we return false
     if(!response.ok)return false;
 } catch (error) {
    console.log('Main server is probably not running');
 }
 return true; // all checks have passed (shouldn't return true over here but for development we need it so we can work on the page)
};

// * set authentication to be used for conditional rendering which depends on user authentication
const setAuthentication = (value)=>{
    localStorage.setItem('is_authenticated', value);
}

// * For conditional rendering
export const isAuthenticated = () =>{
    return localStorage.getItem('is_authenticated');
}

// * runs before the homepage loads completely
export const homeLoader = async () =>{
    if(!await userIsAuthenticated())return redirect('/login');
    setAuthentication(true);
    return null;
}; 


export const editLoader = async ({request})=>{
const url = new URL(request.url); 
if(url.searchParams.get('add_note'))return {};
const noteId = url.searchParams.get('note_id'); 
console.log(noteId);

const note = await fetchData(DOMAIN + '/api/get-notes/'+ noteId, {auth:true}); 
 return note || [];
};
