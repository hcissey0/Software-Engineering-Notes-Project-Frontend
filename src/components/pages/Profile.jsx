import React, { useEffect } from 'react';
import './Profile.css';
import 'boxicons';

const Profile = () => {
    useEffect(() => {
        const editImageButton = document.getElementById('editImageButton');
        const closeButton = document.getElementsByClassName('close-button')[0];
        const imageModal = document.getElementById('imageModal');
        const imageUpload = document.getElementById('imageUpload');
        const saveImageButton = document.getElementById('saveImageButton');
        const profileImage = document.getElementById('profileImage');
        const imagePreview = document.getElementById('imagePreview');

        if (editImageButton && closeButton && imageModal && imageUpload && saveImageButton && profileImage && imagePreview) {
            editImageButton.addEventListener('click', function () {
                imageModal.style.display = 'block';
            });

            closeButton.addEventListener('click', function () {
                imageModal.style.display = 'none';
            });

            window.onclick = function (event) {
                if (event.target === imageModal) {
                    imageModal.style.display = 'none';
                }
            };

            imageUpload.addEventListener('change', function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imagePreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });

            saveImageButton.addEventListener('click', function () {
                const previewImage = imagePreview.src;
                profileImage.src = previewImage;
                imageModal.style.display = 'none';
            });
        }
    }, []);

    return (
        <div>
            <div id="imageModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2>Image Preview</h2>
                    <input type="file" id="imageUpload" accept="image/*" />
                    <div id="imagePreviewContainer">
                        <img id="imagePreview" src="" alt="Image Preview" />
                    </div>
                    <button id="saveImageButton">Save Image</button>
                </div>
            </div>
        <div className='profile-container'>
            <div className='cover-photo'>
                <div className="profile-image">
                    <img id="profileImage" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Profile Image" />
                </div> 
                <button id="editImageButton">
                    <svg  className="w-[39px] h-[39px] text-blue-800 dark:text-white camera" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path  fillRule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
                </svg> 
                </button> 
                      
            </div>
            <div className="profile-information-container">
                <div className='profile-information-box'>
                    <label className='edit-profile'>Edit Profile</label>
                    <h3>Fred Pekyi</h3>
                    <form className='profile-form'>
                        <div className="input-box">
                            <label>Name</label>
                            <input type="text" placeholder='Enter name' />
                        </div>
                        <div className="input-box">
                            <label>Email</label>
                            <input type="text" placeholder='Enter email' />
                        </div>
                        <div className="input-box">
                            <label>Phone Number</label>
                            <input type="text" placeholder='Mobile number' />
                        </div>
                        {/* Removing duplicate label for "Name" */}
                        <div className="input-box">
                            <label>Address</label>
                            <input type="text" placeholder='Enter address' />
                        </div>
                    </form>
                    <button className='save-profile'>Save</button>
                </div>
            </div>
        </div>
        </div>
         
    );
};

export default Profile;
