import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';
import * as Yup from 'yup';
import { GetUserById } from '../../services/user';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createUser, editUser } from '../../store/reducers/user';

const initialState = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    passwordRetype: ''
}

export const UserModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const {error} = useSelector(state => state.user);

    const handleCreate = async(values, setSubmitting) => {
        setTimeout(async() => {
            const resp = await dispatch(createUser(values));
            if(!resp.error){
                dispatch(closeModal());
            }
            setSubmitting(false);
        }, 1000)
    }
    
    const handleEdit = (values, setSubmitting) => {
        setTimeout(async() => {
            const resp = await dispatch(editUser({
                id, 
                values
            }))
            if(!resp.error){
                dispatch(closeModal());
            }
            setSubmitting(false);
        }, 500);
    }

    useEffect(() => {
        if(id){
            setLoading(true);

            const getUser = async() => {
                try {
                    const user = await GetUserById(id);
                    setFormValues({
                        first_name: user.data.first_name,
                        last_name: user.data.last_name,
                        username: user.data.username,
                        email: user.data.email,
                        password: '',
                        passwordRetype: ''
                    });
                    setLoading(false);
                } catch (error) {
                    toast.error(`${error.response.statusText}`, {
                        theme: 'colored'
                    });
                    setLoading(false);
                    dispatch(closeModal())
                }
            }

            setTimeout(() => {
                getUser();
            }, 500)
        }
    }, [id, dispatch])

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            passwordRetype: formValues.passwordRetype
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            first_name: Yup.string()
                    .min(3)
                    .max(50)
                    .required('Requerido'),
            last_name: Yup.string()
                        .min(3)
                        .max(50)
                        .required('Requerido'),
            username: Yup.string()
                        .min(3)
                        .max(50)
                        .required('Requerido'),
            email: Yup.string().email('Email invalido').required('Requerido'),
            password: Yup.string()
                        .min(5, 'Debe ser 5 caracteres o mas')
                        .max(30, 'Debe ser 30 caracteres o mas')
                        .required('Requerido'),
            passwordRetype: Yup.string()
                                .min(5, 'Debe ser 5 caracteres o mas')
                                .max(30, 'Debe ser 30 caracteres o mas')
                                .required('Requerido')
                                .when('password', {
                                    is: (val) => !!(val && val.length > 0),
                                    then: Yup.string().oneOf(
                                    [Yup.ref('password')],
                                    'Las contraseñas no conciden'
                                    )
                                })
        }),
        onSubmit: (values, {setSubmitting}) => {
            if(id){
                handleEdit(values, setSubmitting);    
            } else {
                handleCreate(values, setSubmitting);
            }
        }
    });

    useEffect(() => {
        dispatch(setProps({size: "md", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    return (
        <>
        {
            loading 
            ?
                <div>
                    <Loader active inline='centered' content='Cargando usuario' />
                </div>
            :
            <>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Registrar usuario
                </Modal.Title>
                </Modal.Header>
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
                    <Modal.Body>                
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            content= 'Cerrar'
                            type='button'
                            onClick={() => handleCloseModal()}
                        />

                        <Button 
                            content={id ? 'Actualizar': 'Crear'}
                            type='submit'
                            primary
                            loading={isSubmitting}
                        />
                    </Modal.Footer>
                </form>
            </> 
        }
        </>
    )
}
