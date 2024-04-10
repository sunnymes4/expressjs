import { Button, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import TheaterFormModal from './TheaterFormModal';
import { useSelector } from 'react-redux';
import { GetTheatersByOwner } from '../../apis/theaters';
import GenricTable from '../../components/GenricTable';

function TheaterList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theaters, setTheaters] = useState([]);
  const user = useSelector((state) => state.user.user);

  const fetchTheaters = async () => {
    try {
      const allTheaters = await GetTheatersByOwner({owner:user._id});
      if(allTheaters.success) {
        setTheaters(allTheaters.data);
        message.success(allTheaters.message);
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTheaters();
  }, [])
  return (
    <>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <h1>Theater List</h1>
      <Button type="primary" className='m-b10' onClick={() => setIsModalOpen(true)}>Add Theater</Button>
      {isModalOpen && <TheaterFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
      {theaters && <GenricTable theaters={theaters}/>}
      </Space>
    </>
  )
}

export default TheaterList
