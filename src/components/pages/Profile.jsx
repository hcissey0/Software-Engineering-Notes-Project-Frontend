import React from 'react';
import './Profile.css'
// import 'boxicons'



const Profile = () => {
    return (
        <div className='profile-container'>
            <div className='cover-photo'>
                <div className="profile-image">
                <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                </div>  
                <svg className="w-[39px] h-[39px] text-blue-800 dark:text-white camera" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clip-rule="evenodd"/>
                </svg>       
            </div>
            <div className="profile-information-container">
                <div className='profile-information-box'>
                    <h3>Fred Pekyi</h3>
                    <div className="profile-information">
                        <p>Number of Notes = 23</p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;