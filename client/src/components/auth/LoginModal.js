import React, { useEffect, useState } from 'react';
import {
    NavLink,
    Modal,
    ModalHeader,
    ModalBody,
    Alert,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';

const LoginModal = () => {
    const [modal, setModal] = useState(false) //modal이 열려있는지, 닫혀있는지 확인
    const [localMsg, setLocalMsg] = useState('');
    const [form, setValues] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch(); //리덕스도 hook로 만들어져 사용을 편리하게
    const { errorMsg } = useSelector((state) => state.auth);
    useEffect(() => {
        try {
            setLocalMsg(errorMsg)
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]); //[]빈상태는 한번만 작동

    const handleToogle = () => {
        dispatch({  //리덕스에있는 타입을 보낸다.
            type: CLEAR_ERROR_REQUEST
        });
        setModal(!modal)//modal을 닫아준다.
    };

    const onChange = (e) => { //input를 다루기 위해서는 onChange사용
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        const user = { email, password };
        console.log(user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        });
    };
    return (
        <div>
            <NavLink onClick={handleToogle} href="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToogle}>
                <ModalHeader toggle={handleToogle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button color='dark' style={{ marginTop: "2rem" }} block>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
};

export default LoginModal;