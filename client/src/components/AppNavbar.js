import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
    Navbar,
    Container,
    NavbarToggler,
    Collapse,
    Nav,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';
import LoginModal from '../components/auth/LoginModal';

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
                                <h1 className="text-white">authLink</h1>
                            ) : (
                                    <LoginModal />
                                )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default AppNavbar;