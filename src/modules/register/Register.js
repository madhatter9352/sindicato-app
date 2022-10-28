import React from 'react'
import { setWindowClass } from '../../utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { Checkbox, Button } from 'semantic-ui-react';

export const Register = () => {
    const {handleChange, values, handleSubmit, touched, errors} = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            passwordRetype: '',
            acceptTerms: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(3)
                    .max(50)
                    .required('Required'),
            lastName: Yup.string()
                        .min(3)
                        .max(50)
                        .required('Required'),
            userName: Yup.string()
                        .min(3)
                        .max(50)
                        .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                        .min(5, 'Must be 5 characters or more')
                        .max(30, 'Must be 30 characters or less')
                        .required('Required'),
            passwordRetype: Yup.string()
                                .min(5, 'Must be 5 characters or more')
                                .max(30, 'Must be 30 characters or less')
                                .required('Required')
                                .when('password', {
                                    is: (val) => !!(val && val.length > 0),
                                    then: Yup.string().oneOf(
                                    [Yup.ref('password')],
                                    'Both password need to be the same'
                                    )
                                }),
            acceptTerms: Yup.bool().oneOf([true], 'You should accept the terms')                    
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    });

    console.log(errors.acceptTerms)
    console.log(values)
    
    setWindowClass('hold-transition register-page');
    
    return (
        <div className="register-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Sindicato</b>
                        <span> App</span>
                    </Link>
                </div>
                <div className='card-body'>
                    <p className="login-box-msg">Registra un nuevo usuario</p>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nombre"
                                    onChange={handleChange}
                                    value={values.name}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                {
                                    touched.name && errors.name ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                    ) : (
                                    <InputGroup.Text>
                                        <i className="fa fa-info" />
                                    </InputGroup.Text>
                                    )
                                }
                            </InputGroup>
                        </div>

                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Apellidos"
                                    onChange={handleChange}
                                    value={values.lastName}
                                    isValid={touched.lastName && !errors.lastName}
                                    isInvalid={touched.lastName && !!errors.lastName}
                                />
                                {
                                    touched.lastName && errors.lastName ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                    ) : (
                                    <InputGroup.Text>
                                        <i className="fas fa-info" />
                                    </InputGroup.Text>
                                    )
                                }
                            </InputGroup>
                        </div>

                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    onChange={handleChange}
                                    value={values.userName}
                                    isValid={touched.userName && !errors.userName}
                                    isInvalid={touched.userName && !!errors.userName}
                                />
                                {
                                    touched.userName && errors.userName ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.userName}
                                    </Form.Control.Feedback>
                                    ) : (
                                    <InputGroup.Text>
                                        <i className="fas fa-user" />
                                    </InputGroup.Text>
                                    )
                                }
                            </InputGroup>
                        </div>

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
                        
                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="passwordRetype"
                                    name="passwordRetype"
                                    type="passwordRetype"
                                    placeholder="Repita el password"
                                    onChange={handleChange}
                                    value={values.passwordRetype}
                                    isValid={touched.passwordRetype && !errors.passwordRetype}
                                    isInvalid={touched.passwordRetype && !!errors.passwordRetype}
                                />
                                {
                                    touched.passwordRetype && errors.passwordRetype ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.passwordRetype}
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
                                <InputGroup>
                                    <Checkbox
                                        id='acceptTerms' 
                                        label='Acepto los terminos'
                                        name="acceptTerms"
                                        onChange={handleChange}
                                        className={errors.acceptTerms && 'is-invalid'}
                                    />
                                    {
                                        errors.acceptTerms && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.acceptTerms}
                                            </Form.Control.Feedback>
                                        )
                                    }
                                </InputGroup>
                            </div>
                            <div className='col-4'>
                                <Button 
                                    primary
                                    type='submit'
                                    content='Registrar'
                                />
                            </div>
                        </div>
                    </form>

                    <p className="mb-1">
                        <Link to="/login">
                            Ya tengo cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
