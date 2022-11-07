import { useFormik } from 'formik';
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { setWindowClass } from '../../utils/helpers';

import * as Yup from 'yup';
import { Button, Checkbox } from 'semantic-ui-react';
import {login} from "../../store/reducers/auth";
import {useDispatch, useSelector} from "react-redux";

export const Login = () => {
        const dispatch = useDispatch();
        const {error} = useSelector(state => state.auth);
        const {handleChange, values, handleSubmit, touched, errors} = useFormik({
            initialValues: {
                username: '',
                password: ''
            },
            validationSchema: Yup.object({
                username: Yup.string().required('Required'),
                password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
            }),
            onSubmit: (values) => {
                dispatch(login(values))
            }
        });

        setWindowClass('hold-transition login-page');
    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Sindicato</b>
                        <span> App</span>
                    </Link>
                </div>
                <div className='card-body'>
                    <p className="login-box-msg">Inicia sesión para comenzar</p>
                    {error && <p className="login-box-msg text-danger">Usuario o contraseña incorrectos</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    value={values.username}
                                    isValid={touched.username && !errors.username}
                                    isInvalid={touched.username && !!errors.username}
                                />
                                {
                                    touched.username && errors.username ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                    ) : (
                                    <InputGroup.Text>
                                        <i className="fas fa-envelope" />
                                    </InputGroup.Text>
                                    )
                                }
                            </InputGroup>
                        </div>

                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={touched.password && !!errors.password}
                                />
                                {
                                    touched.password && errors.password ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    ) : (
                                    <InputGroup.Text>
                                        <i className="fas fa-lock" />
                                    </InputGroup.Text>
                                    )
                                }
                            </InputGroup>
                        </div>
                        <div className='row'>
                            <div className='col-8'>
                                <Checkbox label='Recuerdame' />
                            </div>
                            <div className='col-4'>
                                <Button
                                    primary
                                    type='submit'
                                    content='Entrar'
                                />
                            </div>
                        </div>
                    </form>

                    <p className="mb-1">
                        <Link to="/forgot-password">
                            Olvide la contraseña
                        </Link>
                    </p>
                    {/*<p className="mb-0">*/}
                        {/*<Link to="/register" className="text-center">*/}
                        {/*    Registrar un nuevo usuario*/}
                        {/*</Link>*/}
                    {/*</p>*/}
                </div>
            </div>
        </div>
    )
}
