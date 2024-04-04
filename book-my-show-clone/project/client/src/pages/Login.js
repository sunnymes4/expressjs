import React from 'react'
import {Form , Input , Button, message} from 'antd'
import {Link} from 'react-router-dom'
import { LoginUser } from '../apis/users';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

function Login() {

  const dispatchUser = useDispatch();

  const loginUser = async (user) => {
    try {

      const response = await LoginUser(user);

      if(response.success) {
        message.success(response.message);
        dispatchUser(setUser(response.message));
        // window.location.href = '/';
        
      } else {
        message.error(response.message)
      }

    }catch (err) {
      console.log(err);
    }
  }
  return (
     <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Welcome back to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={loginUser}>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="username"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="current-password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Not registered yet? <Link to="/register">Register now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
     </>
  )
}

export default Login