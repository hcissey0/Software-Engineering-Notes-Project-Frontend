import { redirect } from "react-router-dom";

// processes the login data
export const loginAction = async({request}) =>{
    console.log('login form was submitted');
    let formData = Object.fromEntries(await request.formData()); // converting the form data into an object

    return redirect('');
};