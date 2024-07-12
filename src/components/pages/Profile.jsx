import React from 'react';
import './Profile.css'



const Profile = () => {
    return (
        <div className='profile-container'>
            <div className='cover-photo'>
                <div className="profile-image">
                <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                </div>
            </div>
            <div className='profile-information-box'>
                <h3>Fred Pekyi</h3>

            </div>
        </div>
    );
};

export default Profile;