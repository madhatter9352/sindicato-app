import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { closeModal, setProps } from '../../store/reducers/modal';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';

const initialState = {
    name: ''
}

export const DocumentoModal = ({handleAddDocument}) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initialState);

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            name: formValues.name
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Debe tener 3 caracteres o mas')
            .max(30, 'Debe tener 30 caracteres o mas')
            .required('Requerido')
        }),
        onSubmit: (values) => {
            handleAddDocument(values);
            dispatch(closeModal());
        }
    });

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    useEffect(() => {
        dispatch(setProps({size: "md", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);


    return (
        <>
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Añadir Documento
            </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>                
                    <div className='mb-3'>
                        <InputGroup>
                            <Form.Control
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nombre del documento"
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
                                ) : ''
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
                        content={'Crear'}
                        type='submit'
                        primary
                        loading={isSubmitting}
                    />
                </Modal.Footer>
            </form>
        </> 
    )
}
