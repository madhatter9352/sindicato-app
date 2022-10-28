import { useFormik } from 'formik';
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { setWindowClass } from '../../utils/helpers';

import * as Yup from 'yup';
import { Button, Checkbox } from 'semantic-ui-react';

export const Login = () => {
        
        const {handleChange, values, handleSubmit, touched, errors} = useFormik({
            initialValues: {
                email: '',
                password: ''
            },
            validationSchema: Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
            }),
            onSubmit: (values) => {
                console.log(values)
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
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={values.email}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && !!errors.email}
                                />
                                {
                                    touched.email && errors.email ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
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
                            Olvide la contrasenna
                        </Link>
                    </p>
                    <p className="mb-0">
                        <Link to="/register" className="text-center">
                            Registrar un nuevo usuario
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
