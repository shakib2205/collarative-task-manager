import React from 'react';

const MyProfile = () => {
    const user = localStorage.getItem("loggedInUser")
    const loggedInUser = JSON.parse(user)
    return (
        <div className='flex justify-center'>
           <div className='w-1/2 flex  items-center'> <img className='w-20 mr-5 h-20 rounded-full' src={loggedInUser.url} alt="" />
        <div>
            <h6>{loggedInUser.username}</h6>
            <p>{loggedInUser.bio}</p>
        </div></div>
        </div>
    );
};

export default MyProfile;