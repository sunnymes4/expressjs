import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function GenricTable({theaters}) {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const edit = {
        title: 'Action',
        dataIndex: '',
        key: 'e',
        render: () => <Link><EditOutlined/></Link>,
    }

    const deleteItem = {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <Link><DeleteOutlined/></Link>,
    }

    const createColumns = () => {
        if (theaters.length) {
            const keys = Object.keys(theaters[0]);
            let newArr = [];
            keys.forEach(item => {
                if(item !== '__v' && item !== '_id' && item !== 'owner') {
                    newArr.push({
                        title: `${item[0].toUpperCase()}${item.slice(1)}`,
                        dataIndex: item,
                        key: item
                    });
                }
            });

            let data = theaters.map((item, index) => {  
                item.isActive = item.isActive ? 'Approved' : 'Pending';
                item['key'] = String(index);

                return item;
            });

            setColumns([...newArr, edit, deleteItem]);
            console.log(data);
        }
    }

    useEffect(() => {
        createColumns();
    }, [theaters])

  return (
    <>
        {columns && <Table columns={columns} dataSource={theaters}></Table>}
    </>
  )
}

export default GenricTable
