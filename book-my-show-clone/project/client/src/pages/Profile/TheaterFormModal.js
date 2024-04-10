import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import {AddTheater} from '../../apis/theaters';
import { useSelector } from 'react-redux';

function TheaterFormModal({isModalOpen, setIsModalOpen }) {
    const user = useSelector((state) => state.user.user);
    console.log(user);

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const submitTheaterFrom = async (payload) => {
        payload.owner = user._id;
        try {
            const response = await AddTheater(payload);
            if(response.success) {
                setIsModalOpen(false);
                message.success(response.message);
            }
        } catch(err) {
            message.error(err.message)
        }
        
    }
    
  return (
    <>
    <Modal open={isModalOpen}  footer={null} closeIcon={false}>
     <Form
       layout="vertical"
       style={{ width: "100%" }}
       onFinish={submitTheaterFrom}
     >
       <Row
         gutter={{
           xs: 6,
           sm: 10,
           md: 12,
           lg: 16,
         }}
       >
         <Col span={24}>
           <Form.Item
             label="Theatre Name"
             htmlFor="name"
             name="name"
             className="d-block"
             rules={[{ required: true, message: "Theatre name is required!" }]}
           >
             <Input
               id="name"
               type="text"
               placeholder="Enter the theatre name"
             ></Input>
           </Form.Item>
         </Col>
         <Col span={24}>
           <Form.Item
             label="Theatre Address"
             htmlFor="address"
             name="address"
             className="d-block"
             rules={[{ required: true, message: "Theatre name is required!" }]}
           >
             <TextArea
               id="address"
               rows="3"
               placeholder="Enter the theatre name"
             ></TextArea>
           </Form.Item>
         </Col>
         <Col span={24}>
           <Row
             gutter={{
               xs: 6,
               sm: 10,
               md: 12,
               lg: 16,
             }}
           >
             <Col span={12}>
               <Form.Item
                 label="Email"
                 htmlFor="email"
                 name="email"
                 className="d-block"
                 rules={[{ required: true, message: "Email  is required!" }]}
               >
                 <Input
                   id="email"
                   type="email"
                   placeholder="Enter the email"
                 ></Input>
               </Form.Item>
             </Col>
             <Col span={12}>
               <Form.Item
                 label="Phone Number"
                 htmlFor="phone"
                 name="phone"
                 className="d-block"
                 rules={[
                   { required: true, message: "Phone number is required!" },
                 ]}
               >
                 <Input
                   id="phone"
                   type="number"
                   placeholder="Enter the phone number"
                 ></Input>
               </Form.Item>
             </Col>
           </Row>
         </Col>
       </Row>
       <Form.Item>
         <Button
           block
           type="primary"
           htmlType="submit"
           style={{ fontSize: "1rem", fontWeight: "600" }}
         >
           Submit the Data
         </Button>
         <Button className="mt-3" block onClick={handleCancel}  >
           Cancel
         </Button>
       </Form.Item>
     </Form>
     </Modal>
   </>
  )
}

export default TheaterFormModal
