import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { closeModal, setProps } from '../../store/reducers/modal';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';

const initialState = {
    agreement: '',
    responsible: '',
    compliance_date: '',
    state: ''
};

export const AcuerdoModal = ({handleAddAcuerdos}) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initialState);

    const handleCreate = async(values) => {
        setTimeout(() => {
            handleAddAcuerdos(values)
            dispatch(closeModal());
        }, 500)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            agreement: formValues.agreement,
            responsible: formValues.responsible,
            compliance_date: formValues.compliance_date,
            state: formValues.state
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            agreement: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
            responsible: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
            compliance_date: Yup.date().required('Required'),
            state: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            // if(id){
            //     handleEdit(values);    
            // } else {
            //     handleCreate(values);
            // }
            handleCreate(values);
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
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Añadir Acuerdo
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>                
                    <div className='mb-3'>
                        <InputGroup>
                            <Form.Control
                                id="agreement"
                                name="agreement"
                                as="textarea"
                                rows={3}
                                placeholder="Argumento"
                                onChange={handleChange}
                                value={values.agreement}
                                isValid={touched.agreement && !errors.agreement}
                                isInvalid={touched.agreement && !!errors.agreement}
                            />
                            {
                                touched.agreement && errors.agreement ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.agreement}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </div>

                    <div className='mb-3'>
                        <InputGroup>
                        <Form.Control
                                id="responsible"
                                name="responsible"
                                type="text"
                                placeholder="Responsable"
                                onChange={handleChange}
                                value={values.responsible}
                                isValid={touched.responsible && !errors.responsible}
                                isInvalid={touched.responsible && !!errors.responsible}
                            />
                            {
                                touched.responsible && errors.responsible ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.responsible}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </div>

                    <div className='mb-3'>
                        <InputGroup>
                        <Form.Control
                                id="compliance_date"
                                name="compliance_date"
                                type="date"
                                onChange={handleChange}
                                value={values.compliance_date}
                                isValid={touched.compliance_date && !errors.compliance_date}
                                isInvalid={touched.compliance_date && !!errors.compliance_date}
                            />
                            {
                                touched.compliance_date && errors.compliance_date ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.compliance_date}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </div>

                    <div className='mb-3'>
                        <InputGroup>
                        <Form.Control
                                id="state"
                                name="state"
                                type="text"
                                placeholder="Estado"
                                onChange={handleChange}
                                value={values.state}
                                isValid={touched.state && !errors.state}
                                isInvalid={touched.state && !!errors.state}
                            />
                            {
                                touched.state && errors.state ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.state}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        content= 'Close'
                        type='button'
                        onClick={() => handleCloseModal()}
                    />

                    <Button 
                        //content={id ? 'Actualizar': 'Crear'}
                        content="Crear"
                        type='submit'
                        primary
                        //loading={isSubmitting}
                    />
                </Modal.Footer>
            </form>
        </>
    )
}
