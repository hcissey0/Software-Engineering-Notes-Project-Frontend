import { redirect } from "react-router-dom";
import { DOMAIN } from "./global";

// processes the login data
export const loginAction = async({request}) =>{
    console.log('login form was submitted');
    let formData = Object.fromEntries(await request.formData()); // converting the form data into an object
    const response = await fetch(DOMAIN + '/api/login/', {
        method:'POST', 
        body:JSON.stringify(formData), 
        headers:{
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    // process response if the user exists
    if(response.ok){
        const accessToken = data.access; // get the access token if the user is successfully logged in
        localStorage.setItem('user_access_token', accessToken); // store it in local storage
        return redirect('/');
    }
    // handle the case for when the user does not exist
    // create a UI component that shows an error message
    return redirect('');
};

// processes the signup data
export const signupAction = async({request})=>{
    let formData = Object.fromEntries(await request.formData()); // converting the form data into an object
    const response = await fetch(DOMAIN + '/api/validate-signup/', {
        method:'POST', 
        body:JSON.stringify(formData), 
        headers:{
            'Content-Type': 'application/json'
        }
    });
    const validationMessage = await response.json();
    if(response.ok){
        return redirect('/login');
    }
    console.log(validationMessage);
    return redirect('');
};