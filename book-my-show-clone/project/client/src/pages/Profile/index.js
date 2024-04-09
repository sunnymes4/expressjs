import { Tabs } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Bookings from './Bookings';
import TheaterList from './TheaterList';



function Profile() {
  const user = useSelector((state) => state.user.user);
  const items = [
    {
      key: '1',
      label: 'Theaters',
      children: <TheaterList/>
    },
    {
      key: '2',
      label: 'Bookings',
      children: <Bookings/>
    }
  ]

  return (
    <div>
        <h1>Welcome {user.name} to your Profile</h1>
        <Tabs items={items}>

        </Tabs>
    </div>
  )
}

export default Profile
