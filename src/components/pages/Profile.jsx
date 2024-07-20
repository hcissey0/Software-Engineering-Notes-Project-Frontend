import React, { useEffect, useState } from 'react';
import './Profile.css';
import 'boxicons';

const Profile = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [name, setName] = useState('User name');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

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
                imageModal.style.display = 'flex';
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

    const openProfileModal = () => setIsProfileModalOpen(true);
    const closeProfileModal = () => setIsProfileModalOpen(false);

    const handleProfileSubmit = (event) => {
        event.preventDefault();
        // Handle profile form submission logic here
        console.log('Profile updated:', { name, email, phone, address });
        closeProfileModal();
    };

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
                        <svg className="w-[39px] h-[39px] text-blue-800 dark:text-white camera" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="profile-information-container">
                    <div className='profile-information-box'>
                        <label className='edit-profile'>Profile</label>
                        <h3>{name}</h3>
                        <h1>{phone}</h1>
                        <h1>{email}</h1>
                        <h1>Number of notes: </h1>
                        <button onClick={openProfileModal} className="edit-profile-btn">Edit Profile</button>
                    </div>
                </div>
            </div>

            {isProfileModalOpen && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <span className="close-btn" onClick={closeProfileModal}>&times;</span>
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleProfileSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label htmlFor="password">Change Password:</label>
                            <input
                                placeholder='Old Password'
                                type="text"
                                id="old password"
                                name="password"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                placeholder='New Password'
                                type="text"
                                id="new password"
                                name="password"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
