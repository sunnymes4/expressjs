import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        if(user.isAdmin) {
            navigate('/admin')
        }
    }, [])
    
  return (
    <div>
        <h1>This is My Profile Page!!</h1>
    </div>
  )
}

export default Profile
