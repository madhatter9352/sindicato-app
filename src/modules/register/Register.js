import React from 'react'
import { setWindowClass } from '../../utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { Checkbox, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/reducers/auth';

export const Register = () => {
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.auth)

    const handleRegister = async({values, setSubmitting}) => {
            dispatch(register(values));
            setTimeout(() => {
                setSubmitting(false);
            }, 1000)
    } 

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            passwordRetype: '',
            acceptTerms: false
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            first_name: Yup.string()
                    .min(3)
                    .max(50)
                    .required('Required'),
            last_name: Yup.string()
                        .min(3)
                        .max(50)
                        .required('Required'),
            username: Yup.string()
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
        onSubmit: (values, {setSubmitting}) => {
            delete values.acceptTerms;
            handleRegister({values, setSubmitting})
        }
    });
    
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
                    {error && (
                        <ul>
                            {
                                Object.keys(error).map((key, i) => {
                                    return <li key={i} className='text-danger'>{error[key]}</li>
                                })
                            }
                        </ul>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder="Nombre"
                                    onChange={handleChange}
                                    value={values.first_name}
                                    isValid={touched.first_name && !errors.first_name}
                                    isInvalid={touched.first_name && !!errors.first_name}
                                />
                                {
                                    touched.first_name && errors.first_name ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.first_name}
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
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Apellidos"
                                    onChange={handleChange}
                                    value={values.last_name}
                                    isValid={touched.last_name && !errors.last_name}
                                    isInvalid={touched.last_name && !!errors.last_name}
                                />
                                {
                                    touched.last_name && errors.last_name ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.last_name}
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
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Nombre de usuario"
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
                                    type="password"
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
                                    loading={isSubmitting}
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
