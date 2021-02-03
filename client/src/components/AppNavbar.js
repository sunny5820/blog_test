import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
    Navbar,
    Container,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Button,
    Form,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
    console.log(userRole, "userRole");

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        });
    }, [dispatch]);

    useEffect(() => {
        setIsOpen(false)
    }, [user]);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    };

    const addPostClick = () => {

    }
    const authLink = (
        <Fragment>
            <NavItem>
                {userRole === "MainJuin" ? (
                    <Form className="col mt-2">
                        <Link to="post" className="btn btn-success text-white px-3" onClick={addPostClick}>
                            Add Post
                        </Link>
                    </Form>
                ) : ""}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link>
                            <Button outline color="light" className="px3" block>
                                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                            </Button>
                        </Link>
                    ) : (
                            <Button outline color="light" className="px3" block>
                                <strong>No User</strong>
                            </Button>
                        )}
                </Form>
            </NavItem>
            <NavItem>
                <Form className="col">
                    <Link onClick={onLogout} to="#">
                        <Button outline color="light" className="mt-2" block>
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    );

    const guestLink = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    )

    return (
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        Side Project's Blog(Sunny Blog)
                    </Link>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {isAuthenticated ? (
                                authLink
                            ) : (
                                    guestLink
                                )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default AppNavbar;