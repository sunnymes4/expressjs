import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Admin() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        if(!user.isAdmin) {
            navigate('/profile')
        }
    }, [])
    
  return (
    <div>
        <h1>This is Admin Page!!</h1>
    </div>
  )
}

export default Admin
