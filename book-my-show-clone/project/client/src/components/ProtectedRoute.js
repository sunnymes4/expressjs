import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loadersSlice';
import { GetCurrentUser } from '../apis/users';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import {message, Layout, Menu} from 'antd';
import { Header } from 'antd/es/layout/layout';
import {HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';


function ProtectedRoute({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useSelector((state) => state.user)
    
    const getValidUser = async () => {
        try{
            // dispatch(showLoading());
            const responseUser = await GetCurrentUser();
            if(responseUser.success) {
                dispatch(setUser(responseUser.data));
                if(!responseUser.data.isAdmin && location.pathname === '/admin') {
                    message.error('You are not authorized to access this page!');
                    navigate('/');
                }
                // dispatch(hideLoading());
            } else {
                dispatch(setUser(null));
                // dispatch(hideLoading());
                message.error(responseUser.message);
            }
            
        }catch(err) {
            dispatch(setUser(null));
            // dispatch(hideLoading());
            message.error(err.message);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            getValidUser();
        } else {
            navigate('/login');
        }
    }, [])

    const navItems = [
        {
            label: (
                <span onClick={() => navigate('/')}>
                    Home
                </span>
            ),
            icon: <HomeOutlined/>,
        },
        {
            label: `${user ? user.name : ''}`,
            icon: <UserOutlined/>,
            children: [
                {
                    label: (
                        <span onClick={() => 
                            user.isAdmin ? navigate('/admin') : navigate('/profile')
                        }>
                            My Profile
                        </span>
                    ),
                    icon: <ProfileOutlined/>
                },
                {
                    label: (
                        <Link to={'/login'} onClick={() => localStorage.removeItem('token')}>LogOut</Link>
                    ),
                    icon: <LogoutOutlined/>
                },
            ],
        },
    ]

  return (
        user && (
            <>
                <Layout>
                    <Header
                        className="d-flex justify-content-between"
                        style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        }}
                    >
                        <Link to={'/'}>
                            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                                Book My Show
                            </h3>
                        </Link>
                        <Menu theme="dark" mode='horizontal' items={navItems}></Menu>

                    </Header>

                    <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                        {children}
                    </div>
                </Layout>
            </>
        )
  )
}

export default ProtectedRoute
